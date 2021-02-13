import React, {useState} from 'react';
import {dataSelectSearch, dataSelectAvatar} from '../resources/data';
import Select from './Select/Select.jsx';
import './MainPage.media.scss';
import './MainPage.scss';

const MainPage = () => {
    const [valueSelects, setValueSelects] = useState({withSearch: '', withAvatar: {
            name: '',
            source: ''
        }});
    const [valueTextInput, setValueTextInput] = useState({firstTextInput: '', secondTextInput: '', thirdTextInput: ''});

    const arrayTextInput = ['firstTextInput', 'secondTextInput', 'thirdTextInput'];

    const handleChooseValueSelect = (valueSelect) => {
        if (typeof valueSelect === 'string') {
            setValueSelects({...valueSelects, 'withSearch': valueSelect});
        } else if (typeof valueSelect === 'object') {
            setValueSelects({...valueSelects, 'withAvatar': valueSelect});
        }
    };

    const handleTextInputChange = event => {
        const {name, value} = event.target;
        setValueTextInput({...valueTextInput, [name]: value});
    }

    const resetFields = () => {
        console.log(valueSelects);
        setValueSelects({
            'withSearch': '',
            'withAvatar': {
                'name': '',
                'source': ''
            }
        });
        setValueTextInput({
            'firstTextInput': '',
            'secondTextInput': '',
            'thirdTextInput': ''
        });
    };

    const filterFields = () => {
        const arrayField = [
            {name: 'Value with search', value: valueSelects.withSearch,},
            {name: 'Value with avatar', value: valueSelects.withAvatar.name,},
            {name: 'Value from first text input', value: valueTextInput.firstTextInput,},
            {name: 'Value from second text input', value: valueTextInput.secondTextInput,},
            {name: 'Value from third text input', value: valueTextInput.thirdTextInput,}];

        arrayField.forEach(item => {
            console.log(item.name + ': ' + item.value);
        });
    };

    return <div className="main-page">
        <h1>New page</h1>
        <div className="main-page-inputs">
            <Select typeSelect="search" dataForSelect={dataSelectSearch}
                    handleChooseValueSelect={handleChooseValueSelect}
                    currentValueSelectSearch={valueSelects.withSearch}/>
            <Select typeSelect="avatar" dataForSelect={dataSelectAvatar}
                    handleChooseValueSelect={handleChooseValueSelect}
                    currentValueSelectAvatar={valueSelects.withAvatar}/>
            {
                arrayTextInput.map((item, index) => {
                    return <input key={item + index} type="text" placeholder="Text field" name={item} value={valueTextInput[item]} onChange={event => handleTextInputChange(event)}/>
                })
            }
            <div className="main-page-inputs-btn">
                <button className="main-page-inputs-btn-reset" onClick={resetFields}>Reset</button>
                <button className="main-page-inputs-btn-filter" onClick={filterFields}>Filter</button>
            </div>
        </div>
    </div>
};

export default MainPage;
