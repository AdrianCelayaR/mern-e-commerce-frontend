import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, Search } from "lucide-react";
const cn = (...classes) => classes.filter(Boolean).join(" ");

const OrdersList = ({ orders, currency }) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "text-yellow-600 bg-yellow-50";
      case "shipped":
        return "text-blue-600 bg-blue-50";
      case "delivered":
        return "text-green-600 bg-green-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-2">
          {["all", "processing", "shipped", "delivered", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-none border transition-colors",
                filter === status
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">
            {searchTerm || filter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "You haven't placed any orders yet."}
          </p>
          {!searchTerm && filter === "all" && (
            <Link
              href="/"
              className="inline-block mt-4 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <div
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                          getStatusColor(order.status)
                        )}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                      <p>
                        {order.items.length} item{order.items.length > 1 ? "s" : ""}
                      </p>
                      {order.estimatedDelivery && (
                        <p>Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="flex justify-end items-center gap-3">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 relative border-2 border-white rounded"
                        >
                          <img
                            src={item.image[0] || "/placeholder.svg"}
                            alt={item.name}
                            className="object-cover rounded"
                          />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-12 bg-gray-100 border-2 border-white rounded flex items-center justify-center text-xs font-medium text-gray-600">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{currency}{order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersList