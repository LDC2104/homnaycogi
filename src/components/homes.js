import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase';
import $ from 'jquery';
import reactStringReplace from 'react-string-replace';


class Homes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            h1 : 'HÔM NAY CÓ GÌ :))',
            data : []
        }
        $(document).ready(function(){ 
            $(window).scroll(function(){ 
                if ($(this).scrollTop() > 300) { //thực hiện lệnh điều kiện Khi lăn chuột xuống dưới hơn 100px
                    $('#back-to-top').fadeIn(); //Xuất hiện nút
                } else { 
                    $('#back-to-top').fadeOut(); //Ngược lại thì ẩn nút
                } 
            }); 
            $(window).scroll(function(){ 
                if ($(this).scrollTop() > 300) { //thực hiện lệnh điều kiện Khi lăn chuột xuống dưới hơn 100px
                    $('#back-to-tops').fadeIn(); //Xuất hiện nút
                } else { 
                    $('#back-to-tops').fadeOut(); //Ngược lại thì ẩn nút
                } 
            }); 
            $(window).scroll(function(){ 
                if ($(this).scrollTop() > 300) { //thực hiện lệnh điều kiện Khi lăn chuột xuống dưới hơn 100px
                    $('#edit').fadeIn(); //Xuất hiện nút
                } else { 
                    $('#edit').fadeOut(); //Ngược lại thì ẩn nút
                } 
            });
            $('#back-to-top').click(function(){ 
                $("html, body").animate({ scrollTop: 0 }, 600); //Animation giúp hoạt ảnh scroll ngược lên đầu trang sẽ mượt hơn
                return false; 
            }); 
        });
    }

    conection = () => {
        var firebaseConfig = {
            apiKey: "AIzaSyAkqAUMx0aRcuvIiuhw_RSfmyUErVXL7_Y",
            authDomain: "ldc2104.firebaseapp.com",
            databaseURL: "https://ldc2104-default-rtdb.firebaseio.com",
            projectId: "ldc2104",
            storageBucket: "ldc2104.appspot.com",
            messagingSenderId: "943234505224",
            appId: "1:943234505224:web:006baff2a46d86b8800fbd",
            measurementId: "G-N7WFL6HTV3"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            }else {
            firebase.app();
        }
    }

    componentDidMount() {
        this.conection();
        firebase.database().ref().once('value', (dataSnapshot) => {
            this.setState({
                data : dataSnapshot.val()
            });console.log(this.state.data);
        });
    }

    onClick = () => {
        const {history} = this.props;
        history.push("/them");
    }

    onClickE = () => {
        const {history} = this.props;
        history.push("/edit");
    }

    getRandomColor = () => {
        const colors = ['red', 'orange', 'green', 'blue',"#FE2E2E", "#FFFF00",	"#0404B4", "#B404AE", "#58FAD0", "#6E6E6E"]
        return colors[Math.floor(Math.random() * colors.length)];
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div className="col-lg-2"></div>
                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style={{padding: "2%", marginLeft: "1.8%"}}>
                        <div style={{textAlign: "center", marginBottom: "2%"}}>
                            {
                                this.state.h1.split(' ').map(text => {
                                    return <h1 style={{ color: this.getRandomColor(), display: 'inline', fontFamily: "cursive, sans-serif"}}>
                                    {text} &nbsp;
                                </h1>  
                                })
                            }
                        </div>
                        <div class="input-group" style={{padding: "2%", border: "1px solid orange"}}>
                               
                               <button type="button" class="btn btn-danger">button</button>
                                
                                <button type="button" class="btn btn-default">button</button>
                                
                                <button type="button" class="btn btn-info">button</button>
                                
                        </div>                        
                    </div>
                </div>
                
            </div>
        )
    }

}


export default Homes;