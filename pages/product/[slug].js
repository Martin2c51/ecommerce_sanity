import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import Head from 'next/head';


const ProductDetails = ({ product, products, vendor}) => {
  const { image, name, details, price} = product;
  const { title, logo } = vendor;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }
  

  return (
    <div>
      <div className="product-detail-container">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];
                                                        window.dataLayer.push({
                                                        'event': 'productView',
                                                        'productName': ${name},
                                                        'prodyctPrice': ${price},
                                                        'sellerName':${title}
                                                    })`}}>
        </script>
        <title>{name}</title>
        </Head>
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <img src={urlFor(logo && logo[index])} className="small-image"/>
          <h3>
            Seller: {title}
          </h3>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug{
        current
    }
  }
  `;

  const products = await client.fetch(query);
//   console.log(products);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  const ref = product.vendor._ref;
  const vendorQuery = `*[_type == "vendor" && _id == '${ref}'][0]`;
  
  
  const vendor = await client.fetch(vendorQuery);

//   console.log(product);
//   console.log(vendor);
  

  return {
    props: { products, product, vendor }
  }
}

export default ProductDetails