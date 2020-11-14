import React, { Component } from 'react';

export class HomePage extends Component {

    render() {
        return (
            
            <div className="p-grid p-fluid dashboard">
                
                <div className="p-col-12">
                    <div className="card">
                        <h1>Home</h1>
                        <h4>Este projeto tem como objetivo o agendamento de envio de mensagens em diferente sistemas/plataformas de comunicação.</h4>
                        <p> 1. Na aba `Agendamento` será listado o status de cada agendamento.</p>
                        <p> 2. No cabeçalho há 3 ícones responsáveis por adicionar, editar e excluir um agendamento.</p>
                    </div>
                </div>

            </div>
        );
    }
}