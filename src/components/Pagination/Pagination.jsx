// import React, { useEffect, useState } from "react";
// import "./pagination.css";

// const Pagination = () => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);

//   const fetchProducts = async () => {
//     const res = await fetch("https://dummyjson.com/products?limit=100");
//     const data = await res.json();
//     if (data && data.products) {
//       setProducts(data.products);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const selectPageHandler = (selectedPage) => {
//     if (
//       selectedPage >= 1 &&
//       selectedPage <= products.length / 10 &&
//       selectedPage !== page
//     ) {
//       setPage(selectedPage);
//     }
//   };
//   return (
//     <main className="container">
//       {products.length > 0 && (
//         <div className="products">
//           {products.slice(page * 10 - 10, page * 10).map((item) => {
//             return (
//               <div key={item.id} className="products__single">
//                 <img src={item.thumbnail} alt={item.title} />
//                 <h4>{item.title}</h4>
//               </div>
//             );
//           })}
//         </div>
//       )}
//       {products.length > 0 && (
//         <div className="pagination">
//           <span
//             onClick={() => selectPageHandler(page - 1)}
//             className={page > 1 ? "" : "pagination__disabled"}
//           >
//             ◀️
//           </span>
//           {[...Array(products.length / 10)].map((_, i) => {
//             return (
//               <span
//                 key={i}
//                 onClick={() => selectPageHandler(i + 1)}
//                 className={page === i + 1 ? "pagination__selected" : ""}
//               >
//                 {i + 1}
//               </span>
//             );
//           })}
//           <span
//             onClick={() => selectPageHandler(page + 1)}
//             className={
//               page < products.length / 10 ? "" : "pagination__disabled"
//             }
//           >
//             ▶️
//           </span>
//         </div>
//       )}
//     </main>
//   );
// };

// export default Pagination;

import React, { useEffect, useState } from "react";
import "./pagination.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { InfinitySpin } from "react-loader-spinner";
import Loader from "../Loader/Loader";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
        setTotal(data.total / 10);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  if (loading) {
    return <Loader />;
  }

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= total && selectedPage !== page) {
      setPage(selectedPage);
    }
  };
  return (
    <main className="container">
      {products.length > 0 && (
        <div className="products">
          {products.map((item) => {
            return (
              <div key={item.id} className="products__single">
                <img src={item.thumbnail} alt={item.title} />
                <h4>{item.title}</h4>
              </div>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disabled"}
          >
            <GrFormPrevious size={20} />
          </span>
          {[...Array(total)].map((_, i) => {
            return (
              <span
                key={i}
                onClick={() => selectPageHandler(i + 1)}
                className={
                  (page === i + 1 ? "pagination__selected" : "",
                  "pagination__block")
                }
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < total ? "" : "pagination__disabled"}
          >
            <GrFormNext size={20} />
          </span>
        </div>
      )}
    </main>
  );
};

export default Pagination;
