import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase';

class Them extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tieude : '',
            noidung : '',
            h1 : 'THÊM GÌ THẾ :o',
        }
    }

    getRandomColor = () => {
        const colors = ['red', 'orange', 'green', 'blue',"#FE2E2E", "#FFFF00",	"#0404B4", "#B404AE", "#58FAD0", "#6E6E6E",
            "#F6CECE", "#045FB4", "#DF01D7", "#5F4C0B", "#F781BE", "#58FA58", "#F4FA58", "#848484", "#4C0B5F", "#FF4000"
        ]
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    onChange = ({target}) => {
        this.setState({
            [target.name] : target.value
        })
    }

    onClick = () => {
        const {history} = this.props;
        if (this.state.tieude !== '' && this.state.noidung !== '') {
            firebase.database().ref(`${Date()}`).set({
                tieude : this.state.tieude,
                noidung : this.state.noidung,
            }).then(
                this.setState({
                    tieude : '',
                    noidung : '',
                }),
                alert('Đăng bài thành công'),
                history.push('/')
            )
        }
    }

    onClickB = () => {
        const {history} = this.props;
        history.push("/");
    }
    

    render() {
        return (
            <div>
                
                <div class="row">
                    <div className="col-2 lef"></div>
                    <div class="col-xs-4 col-sm-6 col-md-8 col-lg-8 auto">
                        <div style={{textAlign: "center", margin: "2% 0"}}>
                                {
                                    this.state.h1.split(' ').map(text => {
                                        return <h1 style={{ color: this.getRandomColor(), display: 'inline', fontFamily: "cursive, sans-serif"}}>
                                        {text} &nbsp;
                                    </h1>  
                                    })
                                }
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control col-md-4" id="exampleInputAmount" value={this.state.tieude} name="tieude" placeholder="Tiêu đề" onChange={this.onChange} />
                            <textarea rows="10" cols="70" class="col-md-8" name="noidung" value={this.state.noidung} form="usrform" placeholder="Nội dung" onChange={this.onChange}> 

                            </textarea>
                            
                            <button style={{backgroundColor: "lightgreen", marginTop: "1%"}} type="button" class="btn btn-large btn-block btn-default" onClick={this.onClick}>SAVE :))</button>
                            
                        </div>

                        <span id="edit" onClick={this.onClickB}>
                            <i class="fas fa-chevron-left"></i>
                        </span>
                        
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Them;