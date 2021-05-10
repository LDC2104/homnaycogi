import React, { Component } from 'react';
import ReactLoading from 'react-loading';


class Sport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded : 'true'
        }
    }

    onLoad = () => {
        this.setState({
            loaded : 'false'
        })
    }
    render() {
        return (
            <div>
                <div class="row">
                    <div className="col-2 left"></div>
                    <div class="col-xs-4 col-sm-6 col-md-8 col-lg-12 auto" style={{height: "450px", width: "100%"}}>
                        <div class="input-group content" style={{padding: "2%", border: "1px solid orange", width: "unset"}}>
                        <iframe onLoad={this.onLoad} width="100%" height="450px" src="https://thethao247.vn/widgets/lich-thi-dau" frameborder="0"></iframe>
                        {
                            this.state.loaded === "true"
                            ? <div className="load">
                                <ReactLoading type={"bars"} color={"black"} height={50} width={50} />
                              </div>
                            : ''
                        }                    
                        </div>    
                        
                    </div>
                </div>                
            </div>
        )
    }

}


export default Sport;