export default function CartDrawer({
  cart,
  onClose,
  onRemove,
  onQty,
  onCheckout,
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div
      className="drawer-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <aside className="drawer">
        <div className="drawer-head">
          <h3>Your cart</h3>
          <button onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {cart.length > 0 ? (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-icon">{item.icon}</div>
                  <div>
                    <b>{item.name}</b>
                    <small>₹{item.price} each</small>
                    <div className="qty">
                      <button onClick={() => onQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => onQty(item.id, 1)} aria-label="Increase quantity">+</button>
                      <button
                        className="remove"
                        onClick={() => onRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <button className="primary full" onClick={onCheckout}>
              Simulate checkout
            </button>
            <small className="cart-note">No real payment is processed.</small>
          </>
        ) : (
          <div className="empty">
            <span>○</span>
            <h3>Your cart is empty</h3>
            <p>Add a second-life product from the marketplace.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
