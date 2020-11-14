import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import { appConfig } from './../app.config';

import Utils from './../utils/Utils';

class GenericForm extends React.Component {
    constructor() {
        super();

        this.state = { status: "browse" };
        this.state.dataTableValue = [];
        this.state.currentRecord = {};
        this.state.conteudoPesquisa = { conteudo: "", campo: "" };
        this.state.showPesquisa = true;

        this.formName = '';
        this.apiEndPoint = '';
        this.campos = [];
        this.validateMessages = [];
        this.newRecord = {};

        this.onNovoClick = this.onNovoClick.bind(this);
        this.onEditarClick = this.onEditarClick.bind(this);
        this.onExcluirClick = this.onExcluirClick.bind(this);
        this.onExcluirYesClick = this.onExcluirYesClick.bind(this);
        this.onExcluirNoClick = this.onExcluirNoClick.bind(this);
        this.onSalvarClick = this.onSalvarClick.bind(this);
        this.onCancelarClick = this.onCancelarClick.bind(this);

        this.onConteudoChange = this.onConteudoChange.bind(this);
        this.onCampoChange = this.onCampoChange.bind(this);
        this.onPesquisarClick = this.onPesquisarClick.bind(this);

        this.getRecords = this.getRecords.bind(this);
        this.getFieldType = this.getFieldType.bind(this);
        this.getGridColumns = this.getGridColumns.bind(this);
        this.getSearchFields = this.getSearchFields.bind(this);
        this.getCampos = this.getCampos.bind(this);

    }

    /***
     * Métodos abstratos, para implementação dos formulários
     */
    renderFields() { }
    onBeforeSave() { }
    onLoadCurrentRecord() { }

    validate() {
        return '';
    }
    /******/

    showMessage(value, param) { // 

        switch (value) {
            case 'onEditarClick':
                this.messages.show({ severity: 'error', summary: 'Erro: Selecione um registro para editar.' });
                break;
            case 'onExcluirClick':
                this.messages.show({ severity: 'error', summary: 'Erro: Selecione um registro para exclusão.' });
                break;

            case 'onSalvarClickWarn':
                this.messages.show({ severity: 'warn', summary: 'Aviso', detail: param });
                break;

            case 'onSalvarClickSuccess':
                this.messages.show({ severity: 'success', summary: 'Successo', detail: param });
                break;

            case 'onSalvarClickError':
                this.messages.show({ severity: 'error', summary: 'Erro', detail: param });
                break;

            case 'onExcluirYesClickSucess':
                this.messages.show({ severity: 'success', summary: 'Successo', detail: param });
                break;

            case 'onExcluirYesClickWarn':
                this.messages.show({ severity: 'warn', summary: 'Aviso', detail: param });
                break;

            case 'onExcluirYesClickError':
                this.messages.show({ severity: 'error', summary: 'Erro', detail: param });
                break;

            default:
                this.messages.show({ severity: 'warn', summary: '!!!', detail: param });
                break;
        }
    }


    getRecords(filters) {
        let opt = { method: 'GET' };
        let url = `${appConfig.URL_SERVER}${this.apiEndPoint}/status`;

        if (filters !== undefined && filters !== null) {
            url = url + '?filters=' + JSON.stringify(filters);
        }

        fetch(url, opt).then(response => {
            response.json().then(function (json) {
                this.setState({ dataTableValue: json.data });
            }.bind(this));


        }).catch(error => {
            console.log('ERROR: ' + error.message);
        });
    }

    onNovoClick() {
        this.setState({ status: "new", currentRecord: Utils.clone(this.newRecord) });
    }

    onEditarClick() {
        if (this.state.currentRecord.id === undefined) {
            this.showMessage('onEditarClick');
        } else {
            this.setState({ status: "edit" });
        }
    }

    onExcluirClick() {
        if (this.state.currentRecord.id === undefined) {
            this.showMessage('onExcluirClick')
        } else {
            this.setState({ displayConfirmExclusao: true });
        }
    }

    onExcluirYesClick() {
        let url = `${appConfig.URL_SERVER}${this.apiEndPoint}/delete/${this.state.currentRecord.id}`;
        let method = "DELETE";

        let opt = { method: method };

        fetch(url, opt).then(response => {
            response.json().then(function (json) {
                if (json.code === 200) {

                    this.showMessage('onExcluirYesClickSucess', json.message);
                    this.getRecords();
                    this.setState({ displayConfirmExclusao: false });
                } else {
                    this.showMessage('onExcluirYesClickWarn', json.message);
                }
            }.bind(this));
        }).catch(error => {
            this.showMessage('onExcluirYesClickError', error.message);
            console.log('ERROR: ' + error.message);
        });
    }

    onExcluirNoClick() {
        this.setState({ displayConfirmExclusao: false });
    }

    async onSalvarClick() {
        await this.onBeforeSave();

        await this.messages.clear();
        let msgs = this.validate();

        if (msgs === '') {
            let url = `${appConfig.URL_SERVER}${this.apiEndPoint}`;
            let method = "POST";

            if (this.state.status === "edit") {
                url = `${appConfig.URL_SERVER}${this.apiEndPoint}/${this.state.currentRecord.id}`;
                method = "PUT";
            }

            let opt = {
                method: method,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.currentRecord)
            };

            fetch(url, opt).then(response => {
                response.json().then(function (json) {
                    if (json.code === 200) {
                        this.showMessage('onSalvarClickSuccess', json.message);
                        this.getRecords();
                        this.setState({ status: "browse", currentRecord: Utils.clone(this.newRecord) });
                    } else {
                        this.showMessage('onSalvarClickWarn', json.message);
                    }
                }.bind(this));
            }).catch(error => {

                this.showMessage('onSalvarClickError', error.message);
                console.log('ERROR: ' + error.message);
            });
        } else {
            this.validateMessages = [];

            let lines = msgs.split('\n').map((item, i) => {
                return <span>{item}<br /></span>;
            });

            this.validateMessages.push({ severity: 'error', sticky: true, summary: '', detail: <span style={{ display: 'inline-block' }}>{lines}</span> });

            this.messages.show(this.validateMessages);
        }
    }

    onCancelarClick() {
        this.messages.clear();

        this.getRecords();

        this.setState({ status: "browse", currentRecord: Utils.clone(this.newRecord) });
    }

    onConteudoChange(event) {
        let conteudoPesquisa = this.state.conteudoPesquisa;
        conteudoPesquisa.conteudo = event.target.value;

        this.setState({ conteudoPesquisa: conteudoPesquisa });
    }

    onCampoChange(event) {
        let conteudoPesquisa = this.state.conteudoPesquisa;
        conteudoPesquisa.campo = event.value;

        this.setState({ conteudoPesquisa: conteudoPesquisa });
    }

    getFieldType(campo) {
        let fieldType = 'string';

        for (let i = 0; i < this.campos.length; i++) {
            if (this.campos[i].field === campo) {
                fieldType = this.campos[i].type;
                break;
            }
        }

        return fieldType;
    }

    onPesquisarClick() {
        let filters = null;

        if (this.state.conteudoPesquisa.campo !== undefined && this.state.conteudoPesquisa.campo !== null &&
            this.state.conteudoPesquisa.conteudo !== undefined && this.state.conteudoPesquisa.conteudo !== null && this.state.conteudoPesquisa.conteudo !== '') {
            filters = {};
            filters.criterias = [{ field: this.state.conteudoPesquisa.campo, value: this.state.conteudoPesquisa.conteudo, fieldtype: this.getFieldType(this.state.conteudoPesquisa.campo) }];
        }

        this.getRecords(filters);
    }

    onFieldChange(field, event) {
        let record = this.state.currentRecord;
        record[field] = event.target.value;

        this.setState({ currentRecord: record });
    }

    async onSelectionChange(event) {
        await this.setState({ currentRecord: event.value });
        this.onLoadCurrentRecord();
    }

    getCampos(atributo) {
        let campos = this.campos.map((col, i) => {
            if (col[atributo]) {
                return col;
            }

            return null;
        });

        campos = Utils.removeNullElements(campos);

        return campos;
    }

    getSearchFields() {
        return this.getCampos('search');
    }

    getGridColumns() {
        let columns = this.getCampos('grid');

        return columns.map((col, i) => {
            return <Column field={col.value} header={col.label} sortable={true} key={i} />;
        });
    }

    render() {

        let showCampos = (this.state.status === "browse") ? "none" : "block";
        let showLista = (this.state.status === "browse") ? "block" : "none";

        let gridColumns = this.getGridColumns();

        const dialogFooter = (
            <div>
                <Button icon="pi pi-times" className="p-button p-button-success" onClick={this.onExcluirNoClick} label="Não" />
                <Button icon="pi pi-check" className="p-button-outlined p-button p-button-danger" onClick={this.onExcluirYesClick} label="Sim" />
            </div>
        );

        const header = (

            <div className="table-header">

                <div className="p-d-flex">
                    <Button icon="pi pi-plus" className="p-button p-button-success" style={{ marginRight: '.25rem' }} onClick={this.onNovoClick} tooltip="Novo" tooltipOptions={{ position: 'top' }} />
                    <Button icon="pi pi-pencil" className="p-button p-button-warning" style={{ marginLeft: '.25em', marginRight: '.25em' }} onClick={this.onEditarClick} tooltip="Editar" tooltipOptions={{ position: 'top' }} />
                    <Button icon="pi pi-trash" className="p-button p-button-danger" style={{ marginLeft: '.25em', marginRight: '.25em' }} onClick={this.onExcluirClick} tooltip="Excluir" tooltipOptions={{ position: 'top' }} />
                </div>

            </div>

        );

        return (

            <div className="p-grid p-fluid">

                <div className="p-col-12">
                    <Messages ref={(el) => this.messages = el}></Messages>

                    {/* EDITAR - Cabeçalho e footer (botões) padronizados e permite a injeção dos campos*/}
                    <div className="card card-w-title" style={{ display: showCampos }}>
                        <h1>Agendamento</h1>
                        <div className="p-grid">

                            {this.renderFields()}

                            <div className="p-grid p-col-12">
                                <div className="p-col-12 p-md-3">
                                    <Button id="idBtnSalvar" label="Salvar" className="p-button p-button-success p-button-rounded" icon="pi pi-check" iconPos="right" style={{ marginTop: '1.6em' }} onClick={this.onSalvarClick} />
                                </div>
                                <div className="p-col-12 p-md-3">
                                    <Button id="idBtnCancelar" label="Cancelar" className="p-button-outlined p-button-danger p-button-rounded" icon="pi pi-times" iconPos="right" style={{ marginTop: '1.6em' }} onClick={this.onCancelarClick} />
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Exibir os itens da tabela*/}

                    <div className="card card-w-title" style={{ display: showLista }}>

                        <h1 style={{ marginTop: '0px' }}>Status de {this.formName}</h1>

                        <DataTable
                            // className="p-datatable-responsive-demo"
                            value={this.state.dataTableValue}
                            selectionMode="single"
                            paginator={true}
                            rows={10}
                            responsive={true}
                            selection={this.state.currentRecord}
                            onSelectionChange={this.onSelectionChange.bind(this)}
                            header={header}
                        >

                            {gridColumns}

                        </DataTable>

                    </div>


                    {/* Modal para exibir confirmação de exclusão */}
                    <div>
                        <Dialog
                            visible={this.state.displayConfirmExclusao}
                            style={{ width: '450px' }}
                            header={<b>Confirmação</b>}
                            modal={true}
                            footer={dialogFooter}
                            onHide={() => this.setState({ displayConfirmExclusao: false })}
                        >
                            <p>Confirma a exclusão do registro?</p>
                        </Dialog>
                    </div>
                </div>

            </div>
        );
    }
}

export default GenericForm;