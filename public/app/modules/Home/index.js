import React from 'react';
import { connect } from 'react-redux';
import AdService from '../../services/AdService';
import AdChart from './AdChart';
import Table from '../../components/Table';
import Button from 'muicss/lib/react/button';
import Input from 'muicss/lib/react/input';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import styles from './styles.scss';

export class Home extends React.Component {

    state = {
        isShowingModal: false,
    }

    loadList = (...params) => {
        const service = new AdService(this.props.dispatch, this.props.state);
        return service.list(...params)
            .then((data) => {
                const list = data.rows.map((ad) => ({
                    ...ad,
                    // checkbox goes here
                }));

                return {
                    ...data,
                    rows: list
                };
            });
    }

    model = {
        adId: { sortable: false, title: 'ID' },
        Name: { sortable: true },
        Link: { sortable: true },
        Url: { sortable: true },
        active: { sortable: false }
    }

    handleClick = () => {this.setState({isShowingModal: true}) } 
    handleClose = () => {this.setState({isShowingModal: false})}

    render() {
        const count = this.props.analytics.reduce((sum, a) => (a.clickCount + sum), 0);

        return ( 
            <div className = { styles.container } >

                <div className = { styles.row } >
                    <div className = { styles.left } >
                        <AdChart / >
                    </div> 
                    
                    <div className = { styles.right } >
                
                        <div className = { styles.counter } >
                            <h3 > Balance < /h3> <span> $300 .00 </span> 
                        </div> 
                        <div className = { styles.counter } >
                            <h3 > Click Count < /h3> <span > { count } < /span> 
                        </div> 

                    </div> 
                </div> 
                
                <Table model = { this.model } selectable = { false }  onUpdate = { this.loadList } /> 

                <div>
                    <Button className = { styles.actionbutton } variant="fab" onClick={this.handleClick} color="primary" >+</Button>
                </div>
                {
                  this.state.isShowingModal && <ModalContainer onClose={this.handleClose}>
                      <ModalDialog onClose={this.handleClose}>
                            <Input hint="AD Name" />
                            <Input hint="Web Link" />
                            <span>Drag and drop image</span>
                            <div className = { styles.imgView }>
                                <Button color="primary" className = { styles.uploadbut } >upload a file here</Button>
                            </div>
                            <Button variant="raised" color="primary" className = { styles.savebutton } >SAVE</Button>
                      </ModalDialog>
                  </ModalContainer>
                }

           </div>
        );

    }
}

const mapStatesToProps = (state) => ({ state, analytics: state.ad.analytics });

export default connect(mapStatesToProps)(Home);