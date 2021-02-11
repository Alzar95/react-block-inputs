import React, {useState} from 'react';
import selectIcon from '../resources/images/selectIcon.png';
import {dataSelectSearch, dataSelectAvatar} from '../resources/data';
import './MainPage.scss';

const MainPage = () => {
    const [currentDataWithFilter, setCurrentDataWithFilter] = useState(dataSelectSearch);
    const [switchSelectSearch, setSwitchSelectSearch] = useState(false);
    const [switchSelectAvatar, setSwitchSelectAvatar] = useState(false);
    const [valueForSearch, setValueForSearch] = useState('');
    const [valueWithAvatar, setValueWithAvatar] = useState({name: '', source: ''});
    const [valueWithSearch, setValueWithSearch] = useState('');
    const [valueTextInput, setValueTextInput] = useState({first: '', second: '', third: ''})

    const displaySelectSearch = () => {
        setSwitchSelectSearch(!switchSelectSearch);
    };

    const displaySelect = () => {
        setSwitchSelectAvatar(!switchSelectAvatar);
    };

    const filterItems = (query) => {
        return dataSelectSearch.filter((element) =>
            element.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    }

    const changeValueForSearch = (event) => {
        event.stopPropagation();
        setValueForSearch(event.target.value);
        setCurrentDataWithFilter(filterItems(event.target.value));
    };

    const chooseSelectValueWithAvatar = (value) => {
        setValueWithAvatar(value);
    };

    const chooseSelectValueWithSearch = (valueName) => {
        setValueWithSearch(valueName);
    };

    const handleTextInputChange = event => {
        const {name, value} = event.target;
        setValueTextInput({...valueTextInput, [name]: value});
    }

    const resetFields = () => {
        setValueWithSearch('');
        setValueWithAvatar({
            'name': '',
            'source': ''
        });
        setValueTextInput({
            'first': '',
            'second': '',
            'third': ''
        });
    };

    const filterFields = () => {
        const arrayField = [
            {
                name: 'Value with search',
                value: valueWithSearch,
            },
            {
                name: 'Value with avatar',
                value: valueWithAvatar.name,
            },
            {
                name: 'Value from first text input',
                value: valueTextInput.first,
            },
            {
                name: 'Value from second text input',
                value: valueTextInput.second,
            },
            {
                name: 'Value from third text input',
                value: valueTextInput.third,
            }];

        arrayField.forEach(item => {
            console.log(item.name + ': ' + item.value);
        });
    };

    return <div className="main-page">
        <h1>New page</h1>
        <div className="main-page-inputs">
            <div className="main-page-inputs-select" onClick={displaySelectSearch}>
                <label className="main-page-inputs-select-input">
                    <input type="text" disabled={true} placeholder="Search" value={valueWithSearch} />
                    <img className="main-page-inputs-select-input-icon"
                         style={switchSelectSearch ? {transform: 'rotate(180deg)'} : null}
                         src={selectIcon} alt="select"/>
                </label>
                <div className="main-page-inputs-select-menu" style={switchSelectSearch ? {display: 'block'} : {display: 'none'}}>
                    <input type="text" value={valueForSearch} onChange={event => changeValueForSearch(event)}
                           onClick={event => changeValueForSearch(event)}/>
                    {
                        currentDataWithFilter.map((item, index) => {
                            return <div key={index + item} className="main-page-inputs-select-menu-item" onClick={() => chooseSelectValueWithSearch(item)}>
                                <span className="main-page-inputs-select-menu-item-text">{item}</span>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="main-page-inputs-select" onClick={displaySelect}>
                <label className="main-page-inputs-select-input-avatar">
                    <input style={valueWithAvatar.source ? {background: `no-repeat left/12% url(${valueWithAvatar.source})`} : null}
                           type="text" disabled={true} placeholder="Search" value={valueWithAvatar.name}/>
                    <img className="main-page-inputs-select-input-icon"
                         style={switchSelectAvatar ? {transform: 'rotate(180deg)'} : null}
                         src={selectIcon} alt="select"/>
                </label>
                <div className="main-page-inputs-select-menu" style={switchSelectAvatar ? {display: 'block'} : {display: 'none'}}>
                    {
                        dataSelectAvatar.map((item, index) => {
                            return <div key={index + item} className="main-page-inputs-select-menu-item" onClick={() => chooseSelectValueWithAvatar(item)}>
                                <img src={item.source} width={24} height={24}  alt="ava1"/>
                                <span className="main-page-inputs-select-menu-item-text">{item.name}</span>
                            </div>
                        })
                    }
                </div>
            </div>
            <input type="text" placeholder="Text field" name="first" value={valueTextInput.first} onChange={event => handleTextInputChange(event)}/>
            <input type="text" placeholder="Text field" name="second" value={valueTextInput.second} onChange={handleTextInputChange}/>
            <input type="text" placeholder="Text field" name="third" value={valueTextInput.third} onChange={handleTextInputChange}/>
            <button className="main-page-inputs-btn-reset" onClick={resetFields}>Reset</button>
            <button className="main-page-inputs-btn-filter" onClick={filterFields}>Filter</button>
        </div>
    </div>
};

export default MainPage;
