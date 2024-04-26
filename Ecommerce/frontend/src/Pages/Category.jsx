import React, { useContext } from 'react';
import './Category.css'
import { EContext } from '../Context/Econtext';
import Item from '../Components/Item/Item';

const Category = (props) => {
  const {all_product} = useContext(EContext)
  return (
    <div className='category'>
      <div className="categoryProducts">
        {all_product.map((item,i)=> {
          if(props.category === item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else
          {
            return null;
          }

        })}

      </div>
    </div>
  );
}

export default Category;