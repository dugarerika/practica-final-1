import React from 'react';
import SelectTag from '../SelectTag';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import './search3.css'

function Search3 ({ onChangeText, handlerSubmit, name, priceMin, priceMax, tag, type, t }) {
  return (
  <>
    <div className="search3">
       
      <form id="form-search" action="." onSubmit={handlerSubmit}>
                                           
            <div className="field has-addons ">

                    <div>
                      <label className="label">Buscar</label>
                      <input className="buscar" placeholder={`${t("Search Advert")}...`}
                          value={name} name='name' onChange={onChangeText} type="search" 
                        />
                    </div>

                      <div>
                      <label className="label">{t("Type")}</label>
                
                      <div className="">
                          <select name='type' className="tipo" 
                              value={type}  onChange={onChangeText}
                              >
                              <option value='all'>{t("all")}</option>
                              <option value='buy'>{t("buy")}</option>
                              <option value='sell'>{t("sell")}</option>
                           </select>
                      </div>
                      </div>

                     <div className="" >
                        <label className="label">{t("Tag")}</label>
                        <SelectTag tag={tag} onChange={onChangeText}/>
                      </div>

                    <div className="">
                      <label className="label">{t("Minimal Price")}</label>
                      <input className="min"
                      placeholder="0"
                      type="number"
                      value={priceMin} 
                      name='priceMin'
                      onChange={onChangeText} 
                      />
                    </div>

                    <div className=" ">
                      <label className="label">{t("Maximal Price")}</label>
                      <input className="max" placeholder="0"
                      value={priceMax} name='priceMax' onChange={onChangeText} type="number"
                      />
                    </div>

                    <div className="boton-buscar">
                          <label className="label">Buscar</label>
                          <button className="boton-1">{t("Search")}</button>
                    </div>

            </div>
            
        </form>


    </div>
  </>
  )
}

Search3.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  handlerSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  priceMin: PropTypes.string.isRequired,
  priceMax: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  type:PropTypes.string.isRequired
}

export default withTranslation()(Search3);