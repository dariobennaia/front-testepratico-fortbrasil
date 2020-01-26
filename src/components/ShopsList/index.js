import React from 'react';
import './style.css';
import { FaTrashAlt, FaEdit, FaInfo } from 'react-icons/fa';

class ShopsList extends React.Component {
  render() {
    const { shopEdit, shopDelete, shops = [] } = this.props;// eslint-disable-line
    const imageShopList =
      'https://cdn.icon-icons.com/icons2/606/PNG/512/shop-store-frontal-building_icon-icons.com_56118.png';

    return (
      <>
        <ul>
          {shops.map(shop => (
            <li key={shop._id} className="shop-item">
              <header>
                <img src={imageShopList} alt="Loja" />
                <div className="shop-info">
                  <strong>{shop.name}</strong>
                </div>
                <div className="shop-actions">
                  <button onClick={() => shopDelete(shop._id)}>
                    <FaTrashAlt />
                  </button>
                  <button onClick={() => shopEdit(shop)}>
                    <FaEdit />
                  </button>
                </div>
              </header>
              <p>{shop.about}</p>
            </li>
          ))}
        </ul>
        {shops.length === 0 && (
          <div className="no-information">
            <span>
              <FaInfo />
              Nenhuma loja cadastrada
            </span>
          </div>
        )}
      </>
    );
  }
}

export default ShopsList;
