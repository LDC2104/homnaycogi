import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase';
import $ from 'jquery';
import reactStringReplace from 'react-string-replace';
import { CustomDialog} from 'react-st-modal';
import Dialog from './dialog';
import ReactLoading from 'react-loading';


class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            h1 : 'THAY ĐỔI GÌ THẾ :O',
            data : [],
            search : '',
            dataS : []
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
                data : Object.entries(dataSnapshot.val())
            });
        });
    }

    onClick = () => {
        const {history} = this.props;
        history.push("/them");
    }

    onChange = ({target}) => {
        this.setState({
            [target.name] : target.value.toLowerCase()
        })
    }

    onClickB = () => {
        const {history} = this.props;
        history.push("/");
    }

    getRandomColor = () => {
        const colors = ['red', 'orange', 'green', 'blue',"#FE2E2E", "#FFFF00",	"#0404B4", "#B404AE", "#58FAD0", "#6E6E6E",
            "#F6CECE", "#045FB4", "#DF01D7", "#5F4C0B", "#F781BE", "#58FA58", "#F4FA58", "#848484", "#4C0B5F", "#FF4000"
        ]
        return colors[Math.floor(Math.random() * colors.length)];
    }

    render() {
        if (this.state.search !== '' && this.state.data !== null) {
            this.state.dataS = this.state.data.filter((item) => {
                return item[1].tieude.toLowerCase().indexOf(this.state.search) !== -1
            });
        } else {
            this.state.dataS = this.state.data
        }
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
                        {
                            this.state.data.length === 0
                            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: "150px"}}>
                                <ReactLoading type={"spinningBubbles"} color={"black"} height={50} width={50} />
                              </div>
                            : <div class="input-group" style={{padding: "2%", border: "1px solid orange"}}>
                                <div style={{width: '100%', position: 'relative', paddingBottom: '20px'}}>
                                    <input className="search col-auto form-control" type="search" name="search" id="input" value={this.state.search} required="required" title="Bạn muốn kiếm gì" placeholder="Bạn muốn kiếm gì..." onChange={this.onChange} />
                                    {/* <i class="fas fa-search iconS"  style={{position: 'absolute', right: '0', padding: '13px'}}></i> */}
                                </div>
                                {
                                    this.state.dataS.length !== 0 && this.state.data !== null
                                    ?
                                        this.state.dataS.map((ds, index) => {
                                            return  <div style={{wordWrap: "break-word", width: "100%"}}>
                                                        <div name="tieude" style={{display: "flex", justifyContent: 'space-between'}}>
                                                            <h3 style={{fontFamily: "cursive, sans-serif"}}>{ds[1].tieude}</h3> 
                                                            <i class="far fa-edit s " 
                                                                onClick={async () => {
                                                                    await CustomDialog(<Dialog id={ds[0]} tieude = {ds[1].tieude} noidung = {ds[1].noidung}/>, {
                                                                    title: 'Thay đổi nội dung',
                                                                    });
                                                                }}
                                                            ></i>
                                                        </div>
                                                        <p name="noidung" style={{fontFamily: "cursive, sans-serif", textIndent: '5%'}}>{ds[1].noidung.split('\n').map(str => {
                                                            return (
                                                                str.indexOf('https://i.ibb.co') !== -1
                                                                ?   reactStringReplace(str, /(https?:\/\/i.ibb.co\S+)/g, (match, i) => (
                                                                        <img src={`${str}`} style={{width: '40%', height: '20%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} alt="" />
                                                                    ))
                                                                :
                                                                    str.indexOf('https') !== -1
                                                                    ? reactStringReplace(str, /(https?:\/\/\S+)/g, (match, i) => (
                                                                        <a style={{wordWrap: "break-word"}} key={match + i} href={match}>{match}</a>
                                                                    ))
                                                                    : <p style={{wordWrap: "break-word"}}>{str}</p>
                                                            )
                                                        })}</p>
                                                    </div>
                                        })
                                    : ''
                                }    
                            </div>
                            }

                        <span id="edit" style={{width: "44px", height: "54px"}}  onClick={this.onClickB}>
                            <i class="fas fa-chevron-left"></i>
                        </span>
                        <span id="back-to-tops" onClick={this.onClick}>
                            <i class="fas fa-plus-square"></i>
                        </span>

                        <span id="back-to-top">
                                <i class="fas fa-chevron-up"></i>
                        </span>
                        
                    </div>
                </div>
                
            </div>
        )
    }

}


export default Edit;