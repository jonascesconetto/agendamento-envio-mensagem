import React, { Component } from 'react';
import {appConfig} from './../app.config';

export class AppFooter extends Component {

    render() {
        return  (
            <React.Fragment>
                <div className="layout-footer " >
                    <div style={{ 'float': 'left', display: 'inline-block' }}>
                        <span className="footer-text" style={{ 'marginLeft': '5px' }}>Plataforma de Comunicação</span>
                    </div>

                    <div style={{ 'float': 'right', display: 'inline-block' }}>
                        <span className="footer-text" style={{ 'marginLeft': '5px' }}>Versão: {appConfig.version}</span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}