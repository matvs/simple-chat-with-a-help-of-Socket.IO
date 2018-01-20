import React, { Component } from 'react'
import '../oldPage.css'

export default class OldPage extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (

            <div id="background" style="background-image:url(layout/pics/Raster_Teil_weiss.png);height:100%;width:100%;overflow-y:scroll;">

                <div id="container">
                    <div id="header">
                        <div id="header_bg" style="position:absolute;left:5px;width:501px;height:92px;z-index:4;background-image:url(layout/pics/Header.png)">
                            <div onmouseover="document.getElementById('p7menubar').style.backgroundPosition='-200px'" id="header_text" style="height:width:501px;height:92px;">
                                <div style="position:absolute;left:125px;top:13px;font-family:geneva, sant serif;font-size:10px;color:#4B4B4B">Netzwerk<br />Psychiatrie<br />Psychotherapie<br />Zürich</div>
                                <div style="position:absolute;left:223px;top:13px;font-family:geneva, sant serif;font-size:10px;color:#4B4B4B"><a href="mailto:nppz@hin.ch">nppz@hin.ch</a><br /><a href="http://www.nppz.ch">www.nppz.ch</a></div>
                                <div id="corner" style="position:absolute;left:491px;top:70px;width:11px;height:23px;background-image:url(layout/pics/corner.png);background-position:11px"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




                                )
    }
}