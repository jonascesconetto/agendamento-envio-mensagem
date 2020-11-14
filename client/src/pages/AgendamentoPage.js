import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import GenericForm from './../components/GenericForm'

import Utils from './../utils/Utils'

export class AgendamentoPage extends GenericForm {

    constructor() {
        super();

        this.state.showPesquisa = false;

        this.formName = 'Agendamentos de Comunicação';
        this.apiEndPoint = 'comunicacao/agendamento';
        this.newRecord = {tipo: '', destinatario: '', data: '', hora: '', mensagem: '', status_mensagem: 'Agendado'};
        this.campos = [
            // { label: 'Data', value: 'data', grid: true },
            { label: 'Data', value: 'data', grid: true },
            { label: 'Hora', value: 'hora', grid: true },
            { label: 'Tipo', value: 'tipo', grid: true },
            { label: 'Destinatário', value: 'destinatario', grid: true },
            { label: 'Status', value: 'status_mensagem', grid: true }
        ];

        this.getGridColumns = this.getGridColumns.bind(this);
        this.getRecords();
    }

    renderFields() {
        const tipoEnvioSelectItems = [
            { label: 'Email', value: 'Email' },
            { label: 'SMS', value: 'SMS' },
            { label: 'Push', value: 'Push' },
            { label: 'WhatsApp', value: 'WhatsApp' },
        ];

        return (
            <div className='p-grid p-col-12'>
                <div className="p-col-12 p-md-6 p-lg-6 p-xl-6" style={{ fontWeight: 'bold' }}>
                    <label>Tipo de Envio</label>
                    <Dropdown
                        id={"idTipoDropdown"}
                        style={{ marginTop: '1rem' }}
                        value={this.state.currentRecord.tipo}
                        options={tipoEnvioSelectItems}
                        onChange={this.onFieldChange.bind(this, 'tipo')}
                        placeholder="Selecione o tipo de envio" />
                </div>
                <div className="p-col-12 p-md-6 p-lg-6 p-xl-6" style={{ fontWeight: 'bold' }}>
                    <label>
                        {(this.state.currentRecord.tipo === "Email") ? 'Destinatário (Email)' : 'Destinatário (N. Celular)'}
                    </label>
                    {(this.state.currentRecord.tipo === "Email") 
                    ? 
                        <InputText
                            id={"idDestinatarioInput"}
                            style={{ marginTop: '1rem' }}
                            value={this.state.currentRecord.destinatario}
                            onChange={this.onFieldChange.bind(this, 'destinatario')} />
                    : 
                        <InputMask
                            id={"idDestinatarioInput"}
                            style={{ marginTop: '1rem' }}
                            mask={'(999) 99999-9999'}
                            value={this.state.currentRecord.destinatario}
                            onChange={this.onFieldChange.bind(this, 'destinatario')} />
                    }
                </div>
                <div className="p-col-12 p-md-6 p-lg-6 p-xl-6" style={{ fontWeight: 'bold' }}>
                    <label>Data</label>    
                    <InputMask
                        id={"idDataInput"}
                        mask={'99/99/9999'}
                        style={{ marginTop: '1rem' }}
                        value={this.state.currentRecord.data}
                        onChange={this.onFieldChange.bind(this, 'data')}
                        showIcon={true} />
                </div>
                <div className="p-col-12 p-md-6 p-lg-6 p-xl-6" style={{ fontWeight: 'bold' }}>
                    <label>Hora</label>
                    <InputMask
                        id={"idHoraInput"}
                        mask={'99:99'}
                        style={{ marginTop: '1rem' }}
                        value={this.state.currentRecord.hora}
                        onChange={this.onFieldChange.bind(this, 'hora')} />
                </div>
                <div className="p-col-12 p-md-6 p-lg-6 p-xl-6" style={{ fontWeight: 'bold' }}>
                    <label>Mensagem</label>
                    <div className="p-inputgroup" style={{ marginTop: '1rem' }}>
                        <InputTextarea
                            id={"idMensagemInput"}
                            value={this.state.currentRecord.mensagem}
                            onChange={this.onFieldChange.bind(this, 'mensagem')} />
                    </div>
                </div>
            </div>
        );
    }

    validate(){
        let msgs = '';

        if(this.state.currentRecord.tipo === undefined || this.state.currentRecord.tipo === null || this.state.currentRecord.tipo === ''){
            msgs = Utils.addMessage(msgs, 'Tipo é obrigatório.');
        }

        if(this.state.currentRecord.destinatario === undefined || this.state.currentRecord.destinatario === null || this.state.currentRecord.destinatario === ''){
            msgs = Utils.addMessage(msgs, 'Destinatário é obrigatório.');
        }
        
        if(this.state.currentRecord.data === undefined || this.state.currentRecord.data === null || this.state.currentRecord.data === ''){
            msgs = Utils.addMessage(msgs, 'Data é obrigatório.');
        }

        if(this.state.currentRecord.hora === undefined || this.state.currentRecord.hora === null || this.state.currentRecord.hora === ''){
            msgs = Utils.addMessage(msgs, 'Hora é obrigatório.');
        }

        if(this.state.currentRecord.mensagem === undefined || this.state.currentRecord.mensagem === null || this.state.currentRecord.mensagem === ''){
            msgs = Utils.addMessage(msgs, 'Mensagem é obrigatório.');
        }

        return msgs;
    }

    onBeforeSave() {
        let record = this.state.currentRecord;//Utils.clone(this.state.currentRecord);

        console.log(record);

        if(record['data'] instanceof Date){
            record['data'] = record['data'].toLocaleDateString();
        }
        
        if(record['hora'] instanceof Date){
            let hora = record['hora'].getHours();
            let minutos = record['hora'].getMinutes();

            if(hora.toString().length === 1){
                hora = `0${hora}`;
            }

            if(minutos.toString().length === 1){
                minutos = `0${minutos}`;
            }

            record['hora'] =  hora + ':' + minutos;
        }

        this.setState({ currentRecord: record });
    }

    onLoadCurrentRecord() { 
        let record = Utils.clone(this.state.currentRecord);
        let parts = record['data'].split('/');

        let data = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`);
        let hora = new Date(`1970-01-01T${record['hora']}:00`);

        record['data'] = data.toLocaleDateString();
        record['hora'] = hora.toLocaleTimeString().substr(0,5);

        this.setState({ currentRecord: record });
    }
}