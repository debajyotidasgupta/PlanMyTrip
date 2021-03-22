import React, { Component } from 'react'
import '../styles/Train.scss'
import '../styles/Flight.scss'
import {Button} from '@material-ui/core'
import { Redirect } from 'react-router-dom'

export class Search extends component {
    constructor(props){
        super(props);
        this.state = {
            textSearchArray: this.porps.textSearchArray,
            dateSearchArray: this.props.dateSearchArray,
            numSearchArray: this.porps.numSearchArray,
            selectSearchArray: this.props.selectSearchArray,
            redirectUrl: this.props.redirectUrl,
            submitted: false,
            backgroundDiv: this.props.backgroundDiv,
            formClass: this.props.formClass,
            texts : [],
            dates : [],
            nums : [],
            selects : [],
            submitIcon: this.props.submitIcon,
            submitText: this.props.submitText,
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true,
        });
        console.log(this.state.submitted);
    }
    constructTextSearch = ()=>{
        const texts = [];
        const textSearchArray = this.state.textSearchArray;
        for(i=0;i<textSearchArray.length;i++){
            item = textSearchArray[i];
            const optionList = [];
            searchList = item.searchList;
            for(i=0;i<searchList.length;i++)
            {
                optionList.push(
                    <option>{searchList[i]}</option>
                );
            }
            
            if(item.hasIcon)
            {
                cssId = item.css.id;
                placeholder = item.css.placeholder;
                color = item.css.color;
                icon = item.icon.icon;
                iconFont = item.icon.fontSize;
                iconColor = item.icon.color;

                texts.push(
                    <div className="row">
                        <div className="column-left">
                            <div className="form-input">
                                <datalist id={item.css_id}>
                                    {optionList}
                                </datalist>
                                <input autoComplete="on" list={cssId} placeholder={placeholder} style={{fontWeight:"bolder",color:{color}}}/>
                            </div>
                        </div>
                        <div className="column-right">
                            <span><icon
                            style={{fontSize:{iconFont},color:{iconColor},
                            }}/></span>
                        </div>
                    </div>
                );
            }
            else{
                cssId = item.css.id;
                placeholder = item.css.placeholder;
                color = item.css.color;

                texts.push(
                    <div className="row">
                        <div className="column">
                            <div className="form-input">
                                <datalist id={item.css_id}>
                                    {optionList}
                                </datalist>
                                <input autoComplete="on" list={cssId} placeholder={placeholder} style={{fontWeight:"bolder",color:{color}}}/>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        this.setState({
            texts: texts,
        });
    }
    constructDateSearch = ()=>{
        const dates = [];
        const dateSearchArray = this.state.dateSearchArray;
        for(i=0;i<dateSearchArray.length;i++){
            item = dateSearchArray[i];
            labelName = item.labelName;
            labelColor = item.labelColor;
            labelText = item.labelText;
            dates.push(
                <div className="row">
                    <div className="column">
                        <div className="form-input">
                            <input type="date" name={labelName} required label={labelName}/>
                            <label style={{color:labelColor}}>{{labelText}}</label>
                        </div>
                    </div>
                </div>
            );
        }
        this.setState({
            dates: dates,
        });
    }
    constructSelectSearch = ()=>{
        const selects = [];
        const selectSearchArray = this.state.selectSearchArray;
        for(i=0;i<selectSearchArray;i++){
            item = selectSearchArray[i];
            labelName = item.labelName;
            selectOptions = item.selectOptions;
            const optionList = [];
            optionList.push(
                <option value="" disabled selected>{labelName}</option>
            );
            for(i=0;i<selectOptions.length;i++){
                option = selectOptions[i];
                optionList.push(
                    <option value={option}>{option}</option>
                );
            }
            selects.push(
                <div className="row">
                    <div className="column">
                        <div class="form-input">
                            <select>
                                {optionList}
                            </select>
                        </div>
                    </div>
                </div>
            );
        }
        this.setState({
            selects: selects,
        });
    }
    constructNumSearch = ()=>{
        const nums = [];
        const numSearchArray = this.state.numSearchArray;
        for(i=0;i<numSearchArray.length;i++){
            item = numSearchArray[i];
            labelName = item.labelName;
            labelColor = item.labelColor;
            labelText = item.labelText;
            nums.push(
                <div className="row">
                    <div className="column">
                        <div class="form-input">
                            <input type="number" min="0" name={labelName} required style={{color:{labelColor}}}/>
                            <label>{labelText}</label>
                        </div>
                    </div>
                </div>
            );
        }
    }
    render(){
        if(this.state.submitted){
            return(<Redirect to={ this.state.redirectUrl }/>);
        }
        this.constructTextSearch();
        this.constructDateSearch();
        this.constructSelectSearch();
        this.constructNumSearch();
        return(
            <div className="main">
                <div className={this.state.backgroundDiv}>
                <div className="paper">
                    <form className={this.state.formClass} onSubmit={this.handleSubmit} noValidate>
                        {texts}
                        {dates}
                        {selects}
                        {nums}
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                        endIcon={submitIcon}
                        >
                            {submitText}
                        </Button>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

export default Search;