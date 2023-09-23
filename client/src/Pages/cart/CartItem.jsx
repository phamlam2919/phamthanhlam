import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../helpers";
import "./cart.css";
function CartItem({ detail }) {
    console.log(detail);
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        setQuantity(() => detail.clickNumber);
    }, []);

    const handleIncrease = (id) => {
        setQuantity(quantity + 1);
        dispatch({ type: "INCREASE_CART_PRODUCT", payload: id });
    };

    const handleDown = (id) => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            dispatch({
                type: "DESCREASE_CART_PRODUCT",
                payload: id,
            });
        }
    };
    return (
        <>
            <tr>
                <td className="product-details">
                    <div>
                        <img src={detail.sources[0].url} alt="" />
                    </div>
                    <div>
                        <span className="product-name">{detail.name}</span>
                        <br />
                        <span className="delete-button">Xóa</span>
                    </div>
                </td>
                <td style={{ textAlign: "center" }} className="product-price">
                    {formatCurrency(
                        detail.price - (detail.price * detail.sale) / 100
                    )}
                </td>
                <td
                    style={{ textAlign: "center" }}
                    className="product-quantity"
                >
                    <div className="quantity-controls">
                        <button
                            className="quantity-button"
                            value="-"
                            onClick={() => handleDown(detail.product_id)}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            className="quantity-input"
                            value={quantity}
                            min="1"
                            readOnly
                        />
                        <button
                            className="quantity-button"
                            value="+"
                            onClick={() => handleIncrease(detail.product_id)}
                        >
                            +
                        </button>
                    </div>
                </td>
                <td style={{ textAlign: "center" }} className="product-total">
                    {formatCurrency(
                        detail.price * (1 - detail.sale / 100) * quantity
                    )}
                </td>
            </tr>
        </>
    );
}

export default CartItem;
