import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase';
import $ from 'jquery';
import reactStringReplace from 'react-string-replace';
import ReactLoading from 'react-loading';
import Sport from '../components/sport';


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            h1 : 'HÔM NAY CÓ GÌ :))',
            data : [],
            search : '',
            dataS : [],
            select : '1',
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
                data : Object.values(dataSnapshot.val())
            });
        });
    }

    onChange = ({target}) => {
        this.setState({
            [target.name] : target.value.toLowerCase()
        })
    }

    onClick = () => {
        const {history} = this.props;
        const person = window.prompt("Mật khẩu bạn ơi", "");
        if (person === "2104") {
            history.push("/them");
        } else {
            alert("Sai rồi nhé...đừng cố làm gì");
        }
        
    }

    onClickE = () => {
        const {history} = this.props;
        const person = window.prompt("Mật khẩu bạn ơi", "");
        if (person === "2104") {
            history.push("/edit");
        } else {
            alert("Sai rồi nhé...đừng cố làm gì");
        };
    }

    getRandomColor = () => {
        const colors = ['red', 'orange', 'green', 'blue',"#FE2E2E", "#FFFF00",	"#0404B4", "#B404AE", "#58FAD0", "#6E6E6E",
            "#F6CECE", "#045FB4", "#DF01D7", "#5F4C0B", "#F781BE", "#58FA58", "#F4FA58", "#848484", "#4C0B5F", "#FF4000"
        ]
        return colors[Math.floor(Math.random() * colors.length)];
    }

    renderSwitch(param) {
        // eslint-disable-next-line default-case
        switch(param) {
          case '2':
            return <Sport />;
          
        }
    }

    render() {
        if (this.state.search !== '' && this.state.data !== null) {
            this.state.dataS = this.state.data.filter((item) => {
                return item.tieude.toLowerCase().indexOf(this.state.search) !== -1
            });
        } else {
            this.state.dataS = this.state.data
        }
        return (
            <div>
                <div class="row">
                    <div className="col-2 left"></div>
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
                    
                        <div className="selection">
                            <select className="cars" id="cars" name="select" onChange={this.onChange}>
                                <option value="1">Học tập</option>
                                <option value="2">Thể thao</option>
                                <option value="3">Game</option>
                                <option value="4">Linh tinh</option>
                            </select>
                        </div>
                        
                        {
                            this.state.data.length === 0
                            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: "150px"}}>
                                <ReactLoading type={"spinningBubbles"} color={"black"} height={50} width={50} />
                              </div>
                            : this.state.select === '1' 
                                ? <div class="input-group content" style={{padding: "2%", border: "1px solid orange", width: "unset"}}>
                                        <div style={{width: '100%', position: 'relative', paddingBottom: '20px'}}>
                                            <input className="search col-auto form-control" type="search" name="search" id="input" value={this.state.search} required="required" title="Bạn muốn kiếm gì" placeholder="Bạn muốn kiếm gì..." onChange={this.onChange} />
                                            {/* <i class="fas fa-search iconS"  style={{position: 'absolute', right: '0', padding: '13px'}}></i> */}
                                        </div>
                                        {
                                            this.state.dataS.length !== 0 && this.state.data !== null
                                            ? 
                                                this.state.dataS.map((ds, index) => {
                                                    return  <div style={{wordWrap: "break-word", width: "100%"}}>
                                                                <h3 style={{fontFamily: "cursive, sans-serif"}}>{ds.tieude}</h3>
                                                                <p style={{fontFamily: "cursive, sans-serif", textIndent: '5%'}}>{ds.noidung.split('\n').map(str => {
                                                                    return (
                                                                        str.indexOf('https://i.ibb.co') !== -1
                                                                        ?   reactStringReplace(str, /(https?:\/\/i.ibb.co\S+)/g, (match, i) => (
                                                                                <img src={`${str}`} style={{width: '40%', height: '20%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} alt="" />
                                                                            ))
                                                                        :   str.indexOf('https') !== -1
                                                                        ? reactStringReplace(str, /(https?:\/\/\S+)/g, (match, i) => (
                                                                            <a style={{wordWrap: "break-word"}} key={match + i} href={match}>{match}</a>
                                                                        ))
                                                                        : <p style={{wordWrap: "break-word"}}>{str}</p>
                                                                    )
                                                                })}</p>
                                                            </div>
                                                })
                                            :   ''
                                        }                            
                                    </div>
                                : this.renderSwitch(this.state.select)
                        }
                        <span id="edit" onClick={this.onClickE}>
                            <i class="far fa-edit"></i>
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

export default Home;