import { useContext } from "react";
import { GlobalContext } from "../context/GobalContext";
import { MdDeleteForever } from "react-icons/md";MdDeleteForever
import { FaCircleMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import Image from "next/image";

function Cart() {
  const { data,setdata,cart,setCart,cartItems,setCartitems } = useContext(GlobalContext);
  
  console.log(cart);
 

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const handleAddQunatity = (el) => {
    console.log("CART", cart);

    const result = cart.map((product) => {
      if (product.id === el.id) {
        product.quantity += 1;
        product.totalPrice = el.price * el.quantity;
        return product;
      }
      return product;
    });
    console.log("RESULT", result);

    setCart(result);
  };

  const handleSubstractQuantity = (el) => {
    const result = cart.map((product) => {
      if (product.id === el.id) {
        if (el.quantity === 1) {
          return el;
        } else {
          el.quantity -= 1;
          el.totalPrice = el.price * el.quantity;
          return el;
        }
      }
      return el;
    });
    setCart(result);
  };
const baseUrl = "http://localhost:3001";
  return (
    <div>
      {cartItems && (
        <div className=" bg-white w-[100%] h-fit  shadow-2xl border transition-all duration-300 ">
          <div>
            <div className="flex justify-between p-[10px] text-black border border-b-slate-50 shadow-2xl">
              <p>Shopped Items</p>
             
              <button onClick={()=>setCartitems(false)}>
                <IoClose />
              </button>
            </div>
            <div>
              {cart.map((el) => {
                return (
                  <div
                    key={el.id}
                    className="grid grid-cols-5  p-[30px] items-center "
                  >
                    <div>
                      <div className="">
                       
                        <Image src={`${baseUrl}${el.image}`} alt={el.name} height={100} width={100} />
                      </div>
                    </div>
                    <div>
                      <p className="text-stone-500">{el.name}</p>
                    </div>
                    <div className="col-span-2 flex justify-around">
                      <div className="text-black   flex items-center justify-center">
                        <button
                       
                          onClick={() => handleAddQunatity(el)}
                        >
                           < IoIosAddCircle />
                        </button>
                      </div>

                      <div>
                        <div>
                          <button
                            
                            style={{ margin: "10px", width: "100%" }}
                          >
                            {el.quantity} x ${el.price}
                          </button>
                        </div>
                        <button
                    
                          style={{ margin: "10px", width: "100%" }}
                        >
                          <span className="font-[700]">${el.totalPrice}</span>
                        </button>
                      </div>
                      <div className="text-black   flex items-center justify-center">
                        <button
                        
                          onClick={() => handleSubstractQuantity(el)}
                        >
                        
                          <FaCircleMinus />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        
                        onClick={() => removeFromCart(el.id)}
                      >
                        
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-[10px] border  border-stone-200 mb-[20px] text-black flex justify-around h-[10vh]  items-center font-extrabold">
              Total : $
              {cart
                .map((el) => el.totalPrice)
                .reduce((prev, cur) => {
                  return prev + cur;
                }, 0)}
            </div>
            <div className=" border  border-stone-200 mb-[20px] flex justify-around h-[10vh]  items-center font-extrabold text-black">
              {/* <Link to="/payment"> */}
                <h2>Check Out</h2>
              {/* </Link> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart