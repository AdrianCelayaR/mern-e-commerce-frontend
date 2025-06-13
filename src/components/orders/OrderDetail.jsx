import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { ShopContext } from "../../context/ShopContext";
import { MapPin, CreditCard, Download } from "lucide-react";
import Title from "../Title";



const cn = (...classes) => classes.filter(Boolean).join(" ");

const OrderDetail = () => {
  const { id } = useParams();
  const { orders } = useContext(ShopContext);
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Order not found</h3>
        <Link
          to="/orders"
          className="inline-block mt-4 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const getStatusIcon = (status, isActive = false) => {
    const iconClass = isActive ? "w-6 h-6 text-black" : "w-6 h-6 text-gray-400";

    switch (status) {
      case "processing":
        return <Clock className={iconClass} />;
      case "shipped":
        return <Truck className={iconClass} />;
      case "delivered":
        return <CheckCircle className={iconClass} />;
      default:
        return <Package className={iconClass} />;
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { key: "processing", label: "Processing", date: order.orderDate },
      { key: "shipped", label: "Shipped", date: order.shippedDate },
      { key: "delivered", label: "Delivered", date: order.deliveredDate },
    ];
    const currentIndex = steps.findIndex((step) => step.key === order.status);
    return steps.map((step, index) => ({
      ...step,
      isCompleted: index <= currentIndex,
      isActive: index === currentIndex,
    }));
  };

  const statusSteps = getStatusSteps();

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/orders" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Header */}
              <div>
                <h1 className="text-3xl font-light mb-2">Order #{order.id}</h1>
                <p className="text-gray-600">
                  Placed on {new Date(order.orderDate).toLocaleDateString()} • {order.items.length} item
                  {order.items.length > 1 ? "s" : ""}
                </p>
              </div>

              {/* Order Status */}
              <div className="border border-gray-200 p-6">
                <h2 className="text-xl font-medium mb-6"><Title text1={'ORDER'} text2={'STATUS'} /></h2>
                <div className="space-y-4">
                  {statusSteps.map((step, index) => (
                    <div key={step.key} className="flex items-center gap-4">
                      <div
                        className={cn(
                          "flex items-center justify-center w-12 h-12 rounded-full border-2",
                          step.isCompleted ? "border-black bg-black text-white" : "border-gray-300",
                        )}
                      >
                        {getStatusIcon(step.key, step.isCompleted)}
                      </div>
                      <div className="flex-1">
                        <p className={cn("font-medium", step.isCompleted ? "text-black" : "text-gray-400")}>
                          {step.label}
                        </p>
                        {step.date && (
                          <p className="text-sm text-gray-600">{new Date(step.date).toLocaleDateString()}</p>
                        )}
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div className={cn("w-px h-8 ml-6", step.isCompleted ? "bg-black" : "bg-gray-300")} />
                      )}
                    </div>
                  ))}
                </div>

                {order.trackingNumber && (
                  <div className="mt-6 p-4 bg-gray-50">
                    <p className="text-sm font-medium mb-1">Tracking Number</p>
                    <p className="text-sm text-gray-600">{order.trackingNumber}</p>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="border border-gray-200 p-6">
                <h2 className="text-xl font-medium mb-6"><Title text1={'ITEMS'} text2={'ORDERED'} /></h2>
                <div className="space-y-6">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-20 h-20 relative bg-gray-100">
                        <img src={item.image[0] || "/placeholder.svg"} alt={item.name} className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium" style={{ fontSize: "clamp(0.8rem, 1.1vw, 1.1rem)" }}>
                            {item.name}
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          {item.color && <p>Color: {item.color}</p>}
                          {item.size && <p>Size: {item.size}</p>}
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="border border-gray-200 p-6">
                <h2 className="text-md font-medium mb-4"><Title text1={'ORDER'} text2={'SUMMARY'} /></h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${order.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-base border-t pt-4">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Shipping Address
                </h3>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payment Method
                </h3>
                <div className="text-sm">
                  <p className="font-medium">{order.paymentMethod.type}</p>
                  <p className="text-gray-600">**** **** **** {order.paymentMethod.last4}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-4 py-2 flex-1 h-12 bg-black hover:bg-gray-800 text-white relative overflow-hidden">
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </button>
                <button variant="outline" className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:text-accent-foreground px-4 py-2 flex-1 h-12 border-gray-300 hover:bg-gray-50">
                  Contact Support
                </button>
                {order.status === "delivered" && (
                  <button variant="outline" className="w-full border-gray-300">
                    Return Items
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default OrderDetail;
