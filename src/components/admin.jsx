import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Plus,
  ArrowUpRight,
} from 'lucide-react';
import EditProductForm from '../components/editproductform';
import useAuth from '../context/useAuth';
import AdminProductForm from '../components/adminproductform';

// Payment status colours
const getPaymentStatusClasses = (status) => {
  const styles = {
    paid: 'bg-green-50 text-green-700',
    pending: 'bg-yellow-50 text-yellow-700',
    failed: 'bg-red-50 text-red-700',
    refunded: 'bg-purple-50 text-purple-700',
  };

  return styles[status?.toLowerCase()] || 'bg-gray-50 text-gray-700';
};

// Delivery status colours
const getOrderStatusClasses = (status) => {
  const styles = {
    pending: 'bg-yellow-50 text-yellow-700',
    processing: 'bg-blue-50 text-blue-700',
    dispatched: 'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
  };

  return styles[status?.toLowerCase()] || 'bg-gray-50 text-gray-700';
};

const Adminpage = () => {
  const { customer, setCustomer } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState('');
  // Order management state
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const [customers, setCustomers] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [customersError, setCustomersError] = useState('');

  // Fetch products from the backend.
  // This function only fetches and returns data; it does not update React state.
  const fetchProducts = useCallback(async () => {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to load products.');
    }

    return data.products;
  }, []);

  // Fetch orders from the backend.
  const fetchOrders = useCallback(async () => {
    const token = sessionStorage.getItem('flowLuxeToken');

    if (!token) {
      throw new Error('Your admin session has expired. Please log in again.');
    }

    const response = await fetch('http://localhost:5000/api/admin/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to load orders.');
    }

    return data.orders;
  }, []);

  // Update an order's delivery status.
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      setOrdersError('');

      const token = sessionStorage.getItem('flowLuxeToken');

      const response = await fetch(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to update order status.');
      }

      // Refresh the orders after updating.
      const updatedOrders = await fetchOrders();
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Order update error:', error);
      setOrdersError(error.message || 'Unable to update order status.');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Refresh products after adding a new product.
  const refreshProducts = useCallback(async () => {
    try {
      const updatedProducts = await fetchProducts();

      setProducts(updatedProducts);
      setProductsError('');
    } catch (error) {
      console.error('Product loading error:', error);
      setProductsError(error.message || 'Unable to load products.');
    }
  }, [fetchProducts]);

  // Load products when the dashboard opens.
  useEffect(() => {
    let isMounted = true;

    fetchProducts()
      .then((loadedProducts) => {
        if (isMounted) {
          setProducts(loadedProducts);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Product loading error:', error);
          setProductsError(error.message || 'Unable to load products.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [fetchProducts]);

  // Load orders when the dashboard opens.
  useEffect(() => {
    let isMounted = true;

    fetchOrders()
      .then((loadedOrders) => {
        if (isMounted) {
          setOrders(loadedOrders);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Order loading error:', error);
          setOrdersError(error.message || 'Unable to load orders.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingOrders(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [fetchOrders]);

  const fetchCustomers = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('flowLuxeToken');

      if (!token) {
        throw new Error('Your admin session has expired. Please log in again.');
      }

      const response = await fetch(
        'http://localhost:5000/api/admin/customers',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to retrieve customers.');
      }

      setCustomers(data.customers);
      setCustomersError('');
    } catch (error) {
      console.error('FETCH CUSTOMERS ERROR:', error);
      setCustomersError(error.message || 'Unable to retrieve customers.');
    } finally {
      setIsLoadingCustomers(false);
    }
  }, []);
  useEffect(() => {
    // This effect loads customer data when the Admin page mounts.
    // State updates happen after the asynchronous API request.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCustomers();
  }, [fetchCustomers]);

  // Format product prices in Nigerian Naira.
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(Number(price));

  // Calculate dashboard statistics from retrieved orders.
  const totalOrders = orders.length;
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      orderFilter === 'all' || order.order_status === orderFilter;

    const searchTerm = orderSearch.trim().toLowerCase();

    const matchesSearch =
      String(order.order_id).includes(searchTerm) ||
      order.customer_name?.toLowerCase().includes(searchTerm) ||
      order.customer_email?.toLowerCase().includes(searchTerm) ||
      order.delivery_phone?.toLowerCase().includes(searchTerm);

    return matchesStatus && matchesSearch;
  });

  const totalCustomers = customers.length;

  const totalRevenue = orders
    .filter((order) => order.payment_status === 'paid')
    .reduce((total, order) => total + Number(order.subtotal), 0);

  // Log out the administrator.
  const handleLogout = () => {
    sessionStorage.removeItem('flowLuxeToken');
    setCustomer(null);
    navigate('/account', { replace: true });
  };

  // Dashboard navigation items.
  const menuItems = [
    { label: 'Overview', icon: LayoutDashboard, href: '#overview' },
    { label: 'Products', icon: Package, href: '#products' },
    { label: 'Orders', icon: ShoppingBag, href: '#orders' },
    { label: 'Customers', icon: Users, href: '#customers' },
    { label: 'Settings', icon: Settings, href: '#settings' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f7fb] text-gray-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-200 bg-white px-6 py-8 md:flex">
          <div className="mb-12">
            <h1 className="text-2xl font-bold tracking-wide text-pink-400">
              FLOW LUXE
            </h1>

            <p className="mt-1 text-xs tracking-widest text-gray-400">
              ADMINISTRATION
            </p>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-pink-50 hover:text-pink-500"
                >
                  <Icon size={19} />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-5 py-7 sm:px-8 lg:px-10">
          {/* Header */}
          <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Welcome back,</p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {customer?.full_name || 'Administrator'}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Here's what's happening with your store.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 md:hidden"
            >
              <LogOut size={17} />
              Logout
            </button>
          </header>
          {/* Overview */}
          <section id="overview" className="mb-10">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-gray-900">
                Store Overview
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Your store statistics will appear here.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {/* Total Products */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Products</span>

                  <Package className="text-pink-400" size={21} />
                </div>

                <p className="mt-5 text-3xl font-bold">
                  {isLoadingProducts ? '...' : products.length}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Products in your catalogue
                </p>
              </div>

              {/* Total Orders */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Orders</span>

                  <ShoppingBag className="text-pink-500" size={21} />
                </div>

                <p className="mt-5 text-3xl font-bold">
                  {isLoadingOrders ? '...' : totalOrders}
                </p>

                <p className="mt-2 text-xs text-gray-400">Customer orders</p>
              </div>

              {/* Customers */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Customers</span>

                  <Users className="text-blue-500" size={21} />
                </div>

                <p className="mt-5 text-3xl font-bold">
                  {isLoadingCustomers ? '...' : totalCustomers}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Registered customers
                </p>
              </div>

              {/* Revenue */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Revenue</span>

                  <ArrowUpRight className="text-green-600" size={21} />
                </div>

                <p className="mt-5 text-3xl font-bold">
                  {isLoadingOrders ? '...' : formatPrice(totalRevenue)}
                </p>

                <p className="mt-2 text-xs text-gray-400">Sales revenue</p>
              </div>
            </div>
          </section>
          {/* Products */}
          <section id="products" className="mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Product Management
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your FLOW LUXE clothing catalogue.
                </p>
              </div>

              <button
                onClick={() =>
                  document.getElementById('add-product')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }
                className="flex items-center gap-2 rounded-xl bg-pink-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-500"
              >
                <Plus size={18} />
                Add Product
              </button>
            </div>

            <div className="mt-6">
              {isLoadingProducts ? (
                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                  Loading your products...
                </div>
              ) : productsError ? (
                <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600">
                  {productsError}
                </div>
              ) : products.length === 0 ? (
                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                  No products found. Add your first product!
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                    >
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-56 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-56 items-center justify-center bg-violet-50">
                          <Package size={45} className="text-violet-300" />
                        </div>
                      )}

                      <div className="p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-pink-500">
                          {product.category_name}
                        </p>

                        <h4 className="mt-2 font-semibold text-gray-900">
                          {product.name}
                        </h4>

                        <p className="mt-2 text-lg font-bold text-pink-400">
                          {formatPrice(product.price)}
                        </p>

                        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                          {product.description || 'No description available.'}
                        </p>

                        <p className="mt-4 text-xs text-gray-400">
                          Product ID: {product.id}
                        </p>
                        <button
                          onClick={() => {
                            setEditingProduct(product);

                            setTimeout(() => {
                              document
                                .getElementById('edit-product')
                                ?.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'start',
                                });
                            }, 100);
                          }}
                          className="mt-4 w-full rounded-xl border border-pink-200 px-4 py-2.5 text-sm font-semibold text-pink-500 transition hover:bg-pink-50"
                        >
                          Edit Product
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          {/* Edit Product Form */}
          {editingProduct && (
            <section id="edit-product" className="mb-10">
              <EditProductForm
                key={editingProduct.id}
                product={editingProduct}
                onCancel={() => setEditingProduct(null)}
                onProductUpdated={async () => {
                  await refreshProducts();
                  setEditingProduct(null);
                }}
              />
            </section>
          )}
          {/* Add Product Form */}
          <section id="add-product" className="mb-10">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-gray-900">
                Add a New Product
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add a new item to your FLOW LUXE clothing catalogue.
              </p>
            </div>

            <AdminProductForm onProductAdded={refreshProducts} />
          </section>

          {/* Orders */}
          <section id="orders" className="mb-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Order Management
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  View customer orders and manage delivery progress.
                </p>
              </div>

              <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-500">
                {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
              </span>
            </div>
            {/* Search orders */}
            <div className="mb-4">
              <input
                type="search"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search by order ID, customer name, email or phone..."
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
            </div>

            {/* Order filters */}
            <div className="mb-5 flex flex-wrap gap-2">
              {[
                { label: 'All Orders', value: 'all' },
                { label: 'Pending', value: 'pending' },
                { label: 'Processing', value: 'processing' },
                { label: 'Dispatched', value: 'dispatched' },
                { label: 'Delivered', value: 'delivered' },
                { label: 'Cancelled', value: 'cancelled' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setOrderFilter(filter.value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    orderFilter === filter.value
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Order error */}
            {ordersError && (
              <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {ordersError}
              </div>
            )}

            {/* Loading */}
            {isLoadingOrders ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                Loading customer orders...
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <ShoppingBag size={40} className="mx-auto mb-3 text-pink-300" />

                <h4 className="font-semibold text-gray-800">
                  {orderSearch || orderFilter !== 'all'
                    ? 'No matching orders found'
                    : 'No orders yet'}
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  {orderSearch || orderFilter !== 'all'
                    ? 'Try changing your search or selecting another filter.'
                    : 'Customer orders will appear here when they make purchases.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <article
                    key={order.order_id}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                  >
                    {/* Order header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-5">
                      <div>
                        <p className="text-xs text-gray-400">
                          Order #{order.order_id}
                        </p>

                        <h4 className="mt-1 font-bold text-gray-900">
                          {order.customer_name}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleString('en-NG', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getPaymentStatusClasses(order.payment_status)}`}
                        >
                          Payment: {order.payment_status}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getOrderStatusClasses(order.order_status)}`}
                        >
                          {order.order_status}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedOrderId(
                            expandedOrderId === order.order_id
                              ? null
                              : order.order_id
                          )
                        }
                        className="rounded-xl bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600 transition hover:bg-pink-100"
                      >
                        {expandedOrderId === order.order_id
                          ? 'Hide Details'
                          : 'View Details'}
                      </button>
                    </div>

                    {/* Order details */}
                    {expandedOrderId === order.order_id && (
                      <div className="grid gap-6 p-5 lg:grid-cols-2">
                        {/* Customer and delivery */}
                        <div>
                          <h5 className="mb-3 font-semibold text-gray-800">
                            Customer & Delivery Details
                          </h5>

                          <div className="space-y-2 text-sm text-gray-600">
                            <p>
                              <span className="font-medium text-gray-800">
                                Customer:
                              </span>{' '}
                              {order.customer_name}
                            </p>

                            <p>
                              <span className="font-medium text-gray-800">
                                Email:
                              </span>{' '}
                              {order.customer_email}
                            </p>

                            <p>
                              <span className="font-medium text-gray-800">
                                Recipient:
                              </span>{' '}
                              {order.delivery_name}
                            </p>

                            <p>
                              <span className="font-medium text-gray-800">
                                Phone:
                              </span>{' '}
                              {order.delivery_phone}
                            </p>

                            <p>
                              <span className="font-medium text-gray-800">
                                Address:
                              </span>{' '}
                              {order.delivery_address}, {order.delivery_city},{' '}
                              {order.delivery_state}
                            </p>
                          </div>
                        </div>

                        {/* Purchased products */}
                        <div>
                          <h5 className="mb-3 font-semibold text-gray-800">
                            Purchased Products
                          </h5>

                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between gap-3 rounded-xl bg-gray-50 p-3"
                              >
                                <div>
                                  <p className="text-sm font-semibold text-gray-800">
                                    {item.productName}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-500">
                                    {formatPrice(item.unitPrice)} ×{' '}
                                    {item.quantity}
                                  </p>
                                </div>

                                <p className="text-sm font-semibold text-gray-800">
                                  {formatPrice(item.subtotal)}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
                            <span className="font-semibold text-gray-700">
                              Product Subtotal
                            </span>

                            <span className="font-bold text-pink-500">
                              {formatPrice(order.subtotal)}
                            </span>
                          </div>

                          <p className="mt-2 text-xs text-gray-400">
                            Delivery charges are arranged separately.
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Update delivery status */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-gray-50 p-5">
                      <label
                        htmlFor={`order-status-${order.order_id}`}
                        className="text-sm font-semibold text-gray-700"
                      >
                        Update Delivery Status
                      </label>

                      <div className="flex items-center gap-3">
                        <select
                          id={`order-status-${order.order_id}`}
                          value={order.order_status}
                          disabled={updatingOrderId === order.order_id}
                          onChange={(e) =>
                            updateOrderStatus(order.order_id, e.target.value)
                          }
                          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        {updatingOrderId === order.order_id && (
                          <span className="text-xs text-pink-500">
                            Updating...
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* CUSTOMERS SECTION */}
          <section id="customers" className="mb-10 space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Customers</h2>
                <p className="text-gray-500">
                  View and manage your registered customers.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsLoadingCustomers(true);
                  fetchCustomers();
                }}
                className="rounded-lg border px-4 py-2 hover:bg-gray-100"
              >
                Refresh Customers
              </button>
            </div>

            {isLoadingCustomers ? (
              <p className="text-gray-500">Loading customers...</p>
            ) : customersError ? (
              <p className="text-red-500">{customersError}</p>
            ) : customers.length === 0 ? (
              <p className="text-gray-500">No customers found.</p>
            ) : (
              <div className="grid gap-4">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {customer.full_name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Customer ID: {customer.id}
                        </p>
                      </div>

                      <span className="w-fit rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                        {customer.total_orders} Orders
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="break-all font-medium">
                          {customer.email}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">
                          {customer.phone || 'Not provided'}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Total Spent</p>
                        <p className="font-semibold">
                          {formatPrice(Number(customer.total_spent))}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Registered</p>
                        <p className="font-medium">
                          {new Date(customer.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Settings */}
          <section id="settings">
            <h3 className="font-bold text-gray-900">Settings</h3>

            <p className="mt-2 text-sm text-gray-500">
              Store settings will be added here.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Adminpage;
