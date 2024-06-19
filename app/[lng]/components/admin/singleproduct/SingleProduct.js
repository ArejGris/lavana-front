"use client";
import { useEffect, useRef, useState } from "react";
import classes from "./single.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./single.css";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
const SingleProduct = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [stars, setStars] = useState(null);
  const [topstar, setTopstar] = useState(0);
  const [review, setReview] = useState(0);
  const [comments, setComments] = useState([
    { customer: "helana issa", content: "this is beautiful" },
    { customer: "areeg issa", content: "this is beautiful" },
  ]);
  const [active, setActive] = useState("comments");
  const [images, setImages] = useState([
    "/images/image-6-370x266.jpg",
    "/images/product2.jpg",
    "/images/image-19-321x333.jpg",
    "/images/image-21-727x804.jpg",
  ]);
  const commentRef = useRef(null);
  async function fetchProduct() {
    const res = await fetch("http://localhost:5000/admin/get-product/" + id);
    const data = await res.json();
    console.log(data);
    setProduct(data.product);
  }

  async function getReviews() {
    const res = await fetch("http://localhost:5000/admin/get-review/" + id);
    const data = await res.json();
    setStars(data.stars);
   const thestars=data.stars
  const max=thestars.reduce((prev,current)=>((prev.reviews>current.reviews)?prev:current),thestars[0])
setTopstar(max.val)
setReview(data.review)
console.log(max)
  }
  async function getComment() {
    const res = await fetch("http://localhost:5000/user/get-comments/" + id);
    const data = await res.json();
    console.log(data.comments, "comments");
    setComments(data.comments);
  }
  async function sendComment(e) {
    e.preventDefault();
    const comment = commentRef.current.value;
    const res = await fetch(
      "http://localhost:5000/admin/comment-product/" + id,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
        mode: "cors",
      }
    );
    const data = await res.json();
    console.log(data);
    const form = e.target;
    form.reset();
    getComment();
  }
  useEffect(() => {
    fetchProduct();
    getComment();
    getReviews();
  }, []);
  return (
    product && (
      <div className={classes.container}>
        <div className={classes.product}>
          <div className={classes.main}>
            <div className={classes.mainimg}>
              <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={50}
                navigation
                scrollbar={{ draggable: true }}
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {images &&
                  images.map((img,index) => (
                    <SwiperSlide key={index}>
                      <div className="img">
                        <img src={img} alt="img" />
                      </div>
                    </SwiperSlide>
                  ))}
                ...
              </Swiper>
            </div>
            <div className={classes.content}>
              <h1 className={classes.title}>{product.keyWord}</h1>
              <p>{product.description}</p>
              <div className={classes.note}>
                <i className="bi bi-pencil"></i>
                New Here?
                <br />
                Get 20% of everything here when you spend +50$
                <br />
              </div>
              <div>
                <span>
                 ${product.price}
                </span>
                <span className={classes.price}>${product.price}</span>
              </div>
              <div className={classes.stars}>
               {[...Array(topstar)].map((star)=><li key={star}><i className="bi bi-star-fill"></i></li>
              )
              }
              {[...Array(5-topstar)].map((star)=><li key={star}><i className="bi bi-star"></i></li>
              )}
              </div>
              <div className={classes.actions}>
                <button>
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button>
                  <i className="bi bi-bookmark-star"></i>
                </button>
                <button>
                  <i className="bi bi-trash"></i>
                </button>
                <button>
                  <i className="bi bi-download"></i>
                </button>
                <button>
                  <i className="bi bi-upload"></i>
                </button>
              </div>
              <ul className={classes.imgs}>
                <li>
                  <img src="/images/image-6-370x266.jpg" alt="" />
                </li>
                <li>
                  <img src="/images/product2.jpg" alt="" />
                </li>
                <li>
                  <img src="/images/image-19-321x333.jpg" alt="" />
                </li>
                <li>
                  <img src="/images/image-21-727x804.jpg" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={classes.addations}>
          <div className="tabs">
            <ul className="list">
              <li
                onClick={() => {
                  setActive("comments"), getComment();
                }}
                style={
                  active === "comments"
                    ? { borderBottom: "3px solid black" }
                    : null
                }
              >
                comments
              </li>
              <li
                onClick={() => {
                  setActive("reviews"), getReviews();
                }}
                style={
                  active === "reviews"
                    ? { borderBottom: "3px solid black" }
                    : null
                }
              >
                reviews
              </li>
            </ul>
            <div className="tab-wrapper">
              {active === "comments" ? (
                <div className="tab">
                  <ul className="comments">
                    {comments &&
                      comments.map((comment,index) => (
                        <li className="comment-container" key={index}>
                          <div className="avatar"></div>
                          <div className="comment">
                            <div className="name">{comment.customer}</div>
                            <div className="text">{comment.content}</div>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <form
                    className={classes.addCommentForm}
                    onSubmit={sendComment}
                  >
                    <div className="avatar"></div>
                    <input
                      type="text"
                      placeholder="write comment...."
                      className={classes.input}
                      ref={commentRef}
                    />
                    <button>
                      <i className="bi bi-send"></i>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="tab">
                  <div className="reviews">
                    <ul className={classes.stars}>
                      <li>
                        <i className="bi bi-star"></i>
                      </li>
                      <li>
                        <i className="bi bi-star"></i>
                      </li>
                      <li>
                        <i className="bi bi-star"></i>
                      </li>
                      <li>
                        <i className="bi bi-star"></i>
                      </li>
                      <li>
                        <i className="bi bi-star"></i>
                      </li>
                    </ul>
                    <div>({review} Review)</div>
                    <ul className="reviews-list">
                     { stars.map((star)=><li>
                        <h1>{star.val} star</h1>{" "}
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{width:`${(star.reviews/review)*100}%`}}></div>
                        </div>
                        <h1>{(star.reviews/review)*100}%</h1>
                      </li>)}
                    
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ height: "200px" }}></div>
      </div>
    )
  );
};

export default SingleProduct;
