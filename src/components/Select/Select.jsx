import React, {Fragment, useState, useEffect} from 'react';
import selectIcon from '../../resources/images/selectIcon.png';
import './Select.scss';

const Select = (props) => {
    const dataForSelect = props.dataForSelect;
    const typeSelect = props.typeSelect;
    const handleChooseValueSelect = props.handleChooseValueSelect;

    const currentValueSelectSearch = props.currentValueSelectSearch;
    const currentValueSelectAvatar = props.currentValueSelectAvatar;

    const [currentDataForSelect, setCurrentDataForSelect] = useState(dataForSelect);
    const [switchSelect, setSwitchSelect] = useState(false);
    const [valueSelectSearch, setValueSelectSearch] = useState('');
    const [valueSelectAvatar, setValueSelectAvatar] = useState({name: '', source: ''});
    const [valueForSearch, setValueForSearch] = useState(''); //For type 'search'

    useEffect(() => {
        setValueSelectSearch(currentValueSelectSearch);
        setValueSelectAvatar(currentValueSelectAvatar);
    }, [currentValueSelectSearch, currentValueSelectAvatar]);

    const displaySelect = () => {
        setSwitchSelect(!switchSelect);
    };

    const chooseValueSelect = (valueName) => {
        typeSelect === 'search' ? setValueSelectSearch(valueName) : setValueSelectAvatar(valueName);
        handleChooseValueSelect(valueName);
    };

    /* For type 'search' */
    const filterItems = (query) => {
        return dataForSelect.filter((element) =>
            element.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    }

    /* For type 'search' */
    const changeValueForSearch = (event) => {
        event.stopPropagation();
        setValueForSearch(event.target.value);
        setCurrentDataForSelect(filterItems(event.target.value));
    };

    return <div className="select" onClick={displaySelect}>
            <label className="select-input">
                <input type="text" disabled={true} placeholder="Search"
                       style={typeSelect === 'avatar' && valueSelectAvatar.source ?
                           {background: `no-repeat left/12% url(${valueSelectAvatar.source})`, paddingLeft: '28px'} : null}
                       value={typeSelect === 'search' ? valueSelectSearch : valueSelectAvatar.name} />
                <img className="select-input-icon"
                     style={switchSelect ? {transform: 'rotate(180deg)'} : null}
                     src={selectIcon} alt="select"/>
            </label>

            <div className="select-menu" style={switchSelect ? {display: 'block'} : {display: 'none'}}>
                {
                    typeSelect === 'search' ? <input type="text" value={valueForSearch} onChange={event => changeValueForSearch(event)}
                       onClick={event => changeValueForSearch(event)}/> : null
                }
                {
                    currentDataForSelect.map((item, index) => {
                        return <div key={index + item.name ? item.name : item} className="select-menu-item"
                                    onClick={() => chooseValueSelect(item)}>
                            {
                                typeSelect === 'avatar' ? <img src={item.source} width={24} height={24}  alt="avatar"/> : null
                            }
                            <span className="select-menu-item-text">{typeSelect === 'search' ? item : item.name}</span>
                        </div>
                    })
                }
            </div>
        </div>
};

export default Select;
