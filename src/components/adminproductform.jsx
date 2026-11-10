import { useEffect, useState } from 'react';
import { ImagePlus, X, Upload, LoaderCircle } from 'lucide-react';
import useAuth from '../context/useAuth';

const AdminProductForm = ({ onProductAdded }) => {
  const { customer } = useAuth();

  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/product-categories'
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Unable to load categories.');
        }

        setCategories(data.categories);
      } catch (error) {
        setCategoriesError(error.message);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files?.[0];

    if (!selectedImage) return;

    if (!['image/jpeg', 'image/png'].includes(selectedImage.type)) {
      setMessage('Please select a JPG or PNG image.');
      event.target.value = '';
      return;
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      setMessage('Image size must not exceed 5MB.');
      event.target.value = '';
      return;
    }

    setMessage('');
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (!image) {
      setMessage('Please select a product image.');
      return;
    }

    const token = sessionStorage.getItem('flowLuxeToken');

    if (!token || !customer) {
      setMessage('Your session has expired. Please log in again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // STEP 1: Upload the image to Cloudinary.
      const formData = new FormData();
      formData.append('image', image);

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
        throw new Error(uploadData.message || 'Image upload failed.');
      }

      // STEP 2: Save product details in PostgreSQL.
      const productResponse = await fetch(
        'http://localhost:5000/api/admin/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            price,
            category_id: categoryId,
            description,
            image_url: uploadData.image.url,
          }),
        }
      );

      const productData = await productResponse.json();

      if (!productResponse.ok || !productData.success) {
        throw new Error(productData.message || 'Unable to save product.');
      }

      setMessage('Product added successfully!');

      setName('');
      setPrice('');
      setCategoryId('');
      setDescription('');
      setImage(null);
      setImagePreview('');

      const fileInput = document.getElementById('product-image');

      if (fileInput) fileInput.value = '';

      if (onProductAdded) {
        await onProductAdded();
      }
    } catch (error) {
      console.error('Add product error:', error);
      setMessage(error.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label
          htmlFor="product-name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>

        <input
          id="product-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Elegant Evening Gown"
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="product-price"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Price (₦)
          </label>

          <input
            id="product-price"
            type="number"
            min="0.01"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="12000"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
          />
        </div>

        <div>
          <label
            htmlFor="product-category"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Category
          </label>

          <select
            id="product-category"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            required
            disabled={isLoadingCategories || !!categoriesError}
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

          {categoriesError && (
            <p className="mt-2 text-xs text-red-500">{categoriesError}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="product-description"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Product Description
        </label>

        <textarea
          id="product-description"
          rows="4"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe the product..."
          className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Product Photograph
        </label>

        <label
          htmlFor="product-image"
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50/40 p-8 text-center transition hover:bg-pink-50"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Product preview"
              className="mb-4 h-48 w-full rounded-xl object-contain"
            />
          ) : (
            <>
              <ImagePlus size={36} className="mb-3 text-pink-400" />
              <span className="font-medium text-gray-700">
                Choose a product photograph
              </span>
              <span className="mt-2 text-xs text-gray-400">
                JPG or PNG, maximum 5MB
              </span>
            </>
          )}

          <span className="mt-3 flex items-center gap-2 text-sm font-medium text-pink-500">
            <Upload size={16} />
            {image ? 'Change photograph' : 'Browse files'}
          </span>
        </label>

        <input
          id="product-image"
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
          className="hidden"
        />

        {image && (
          <button
            type="button"
            onClick={() => {
              setImage(null);
              setImagePreview('');

              const fileInput = document.getElementById('product-image');
              if (fileInput) fileInput.value = '';
            }}
            className="mt-3 flex items-center gap-2 text-sm text-red-500"
          >
            <X size={16} />
            Remove photograph
          </button>
        )}
      </div>

      {message && (
        <p
          role="status"
          className={`rounded-xl p-3 text-sm ${
            message.includes('successfully')
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || isLoadingCategories || !!categoriesError}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-400 px-6 py-3.5 font-semibold text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle size={19} className="animate-spin" />
            Uploading and saving...
          </>
        ) : (
          <>
            <Upload size={18} />
            Add Product
          </>
        )}
      </button>
    </form>
  );
};

export default AdminProductForm;
