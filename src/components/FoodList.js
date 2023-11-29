import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiBaseUrl } from "../constants/constants";
import { SET_CART } from "../redux/slice/cartSlice";
import * as productService from "../services/productService";

const FoodList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const SidebarData = [
    { label: "THAI BUDDA ENTREE", value: "ENTREE" },
    { label: "THAI BUDDA SOUP", value: "SOUP" },
    { label: "THAI BUDDA NOODLE SOUP", value: "NOODLESOUP" },
    { label: "THAI BUDDA CURRY", value: "BUDDACURRY" },
    { label: "THAI BUDDA SIDE DISHES", value: "SIDEDISHES" },
    { label: "THAI BUDDA STIR ON WOK", value: "STIRONWOK" },
    { label: "THAI BUDDA NOODLE STIR ON WOK", value: "NOODLESTIRONWOK" },
    { label: "THAI BUDDA NOODLE FRIED RICE", value: "NOODLEFRIEDRICE" },
    { label: "THAI BUDDA NOODLE CHEF SPECIALS", value: "NOODLECHEFSPECIALS" },
    { label: "INDIAN YUMMY MEAT CURRIES", value: "INDIANYUMMYMEATCURRIES" },
  ];

  const key = "updatable";

  const getItem = async () => {
    setLoading(true);
    const response = await productService.itemList();
    if (response?.status === 200) {
      const sortedItems = response.data.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setProductData(sortedItems);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    getItem();
  }, []);

  const handleAddCart = (item) => {
    setLoading(true);
    dispatch(SET_CART(item));
    message.open({ key, type: "loading", content: "Loading..." });
    setTimeout(() => {
      message.open({ key, type: "success", content: "Add to cart Successfully!." });
    }, 1000);
  };
  return (
    <>
      {/* <div className="row gy-4">
        <div className="text-center mb-4 py-2" style={{ borderBottom: "2px solid #222", borderTop: "2px solid #222" }}>
          <h2 className="title_font">Today's Menu</h2>
        </div>
        {productData?.map((item) => (
          <div className="col-lg-3" key={item?.id} id="menu">
            <div className="food_card">
              <div
                className="mb-2"
                style={{
                  backgroundImage: `url(${apiBaseUrl}/uploads/${item?.itemImg})`,
                  height: "200px",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "10px 10px 0 0",
                }}
              />
              <div className="food_details px-2">
                <div className="common_flexing">
                  <h2 className="medium_font">{item?.name}</h2>
                  <h2 style={{ background: "#222", padding: "0.3rem", color: "#fff" }} className="small_font">
                    {item.price} $
                  </h2>
                </div>
                <h2 className="small_font text-secondary">{item?.description}</h2>
                <Button type="ghost" onClick={() => handleAddCart(item)} className="cart_btn">
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div class="row">
        <div class="col-5 col-lg-3">
          <div id="manu" class="d-flex flex-column gap-2 simple-list-example-scrollspy text-start">
            {SidebarData.map((item) => (
              <a
                class="p-1 rounded border px-3 px-2 text-decoration-none text-black  small_font"
                href={`#${item.value}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div class="col-6 col-lg-9 p-lg-0 p-2">
          {SidebarData.map((id) => (
            <div id={id.value}>
              <div className="row gy-4">
                <div
                  className="text-center mb-4 ms-3 py-2"
                  style={{ borderBottom: "2px solid #222", borderTop: "2px solid #222" }}
                >
                  <h2 className="title_font">{id.label}</h2>
                </div>
                <div className="ms-3 mb-4">
                  {productData
                    ?.filter((item) => item.cuisine === id.value)
                    .map((item) => (
                      <div className="col-lg-3" key={item?.id} id="menu">
                        <div className="food_card">
                          <div
                            className="mb-2"
                            style={{
                              backgroundImage: `url(${apiBaseUrl}/uploads/${item?.itemImg})`,
                              height: "200px",
                              width: "100%",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              borderRadius: "10px 10px 0 0",
                            }}
                          />
                          <div className="food_details px-2">
                            <div className="common_flexing">
                              <h2 className="medium_font">{item?.name}</h2>
                              <h2
                                style={{ background: "#222", padding: "0.3rem", color: "#fff" }}
                                className="small_font"
                              >
                                {item.price} $
                              </h2>
                            </div>
                            <h2 className="small_font text-secondary">{item?.description}</h2>
                            <Button type="ghost" onClick={() => handleAddCart(item)} className="cart_btn">
                              Add to cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodList;
