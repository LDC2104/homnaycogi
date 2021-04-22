import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : props.id,
            tieude : props.tieude,
            noidung : props.noidung,
        }
    }
    
    onChange = ({target}) => {
        this.setState({
            [target.name] : target.value
        })
    }

    onClick = () => {
        firebase.database().ref().child(this.state.id).set({
            tieude : this.state.tieude,
            noidung : this.state.noidung,
        }).then(
            alert('Lưu thành công'),
            window.location.reload()
        )    
    }

    onClickD = () => {
        firebase.database().ref(this.state.id).remove().then(() => {
            alert('Xóa thành công');
            window.location.reload();
        })   
    }
    

    render() {
        return (
            <div>
                
                <div class="row">
                    <div class="col-md-12">
                        
                        <div class="input-group">
                            <input type="text" class="form-control col-md-4" id="exampleInputAmount" value={this.state.tieude} name="tieude" placeholder="Tiêu để" onChange={this.onChange} />
                            <textarea rows="10" cols="70" class="col-md-8" name="noidung" value={this.state.noidung} form="usrform" placeholder="Nội dung" onChange={this.onChange}> 

                            </textarea>
                            
                            <button style={{backgroundColor: "lightgreen", margin: "1% 1% 0% 1%"}} type="button" class="btn btn-large btn-block btn-primary" onClick={this.onClick}>SAVE :))</button>
                            <button style={{backgroundColor: "red", margin: "1%"}} type="button" class="btn btn-large btn-block btn-primary" onClick={this.onClickD}>DELETE :_(</button>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Dialog;