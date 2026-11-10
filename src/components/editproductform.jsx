import { useEffect, useState } from 'react';
import { Save, X, ImagePlus } from 'lucide-react';

const EditProductForm = ({ product, onProductUpdated, onCancel }) => {
  const [name, setName] = useState(product.name || '');
  const [price, setPrice] = useState(product.price || '');
  const [categoryId, setCategoryId] = useState(
    String(product.category_id || '')
  );
  const [description, setDescription] = useState(product.description || '');
  const [imageUrl] = useState(product.image_url || '');
  const [imageFile, setImageFile] = useState(null);

  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load product categories.
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/product-categories'
        );
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Unable to load categories.');
        }

        setCategories(data.categories);
      } catch (err) {
        setError(err.message || 'Unable to load categories.');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Handle image selection.
  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setImageFile(selectedFile);
    setError('');
  };

  // Save product changes.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      const token = sessionStorage.getItem('flowLuxeToken');

      if (!token) {
        throw new Error('Your admin session has expired. Please log in again.');
      }

      let updatedImageUrl = imageUrl;

      // Upload a replacement image only if one was selected.
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadResponse = await fetch(
          'http://localhost:5000/api/admin/products/upload',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok || !uploadData.success) {
          throw new Error(
            uploadData.message || 'Unable to upload the new product image.'
          );
        }

        updatedImageUrl = uploadData.image.url;
      }

      // Update the existing product.
      const response = await fetch(
        `http://localhost:5000/api/admin/products/${product.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            price: Number(price),
            category_id: Number(categoryId),
            description,
            image_url: updatedImageUrl,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to update product.');
      }

      setSuccess('Product updated successfully!');

      await onProductUpdated();
    } catch (err) {
      console.error('Product update error:', err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Edit Product</h3>
          <p className="mt-1 text-sm text-gray-500">
            Editing product ID: {product.id}
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          aria-label="Close edit form"
        >
          <X size={20} />
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {success}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Price (₦)
          </label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Product Category
          </label>
          <select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            required
            disabled={isLoadingCategories}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-pink-400"
          >
            <option value="">
              {isLoadingCategories
                ? 'Loading categories...'
                : 'Select category'}
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="4"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Product Image
          </label>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Current product"
              className="mb-3 h-40 w-40 rounded-xl object-cover"
            />
          )}

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 p-4 transition hover:border-pink-400">
            <ImagePlus className="text-pink-400" size={24} />
            <span className="text-sm text-gray-600">
              {imageFile ? imageFile.name : 'Choose a replacement image'}
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <p className="mt-2 text-xs text-gray-400">
            JPG, PNG or WebP. Maximum file size: 5MB.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSaving || isLoadingCategories}
          className="flex items-center gap-2 rounded-xl bg-pink-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />
          {isSaving ? 'Saving Changes...' : 'Save Changes'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
