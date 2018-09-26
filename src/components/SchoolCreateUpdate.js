import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import { updateStudent } from '../store';

// class SchoolCreateUpdate extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       address: '',
//       description: '',
//     }
//     this.componentDidUpdate = this.componentDidUpdate.bind(this);
//     this.onSave = this.onSave.bind(this);
//   }

//   componentDidUpdate(prevProps) {
//     if (!prevProps.name && this.props.name) {
//       this.setState({

//       })
//     }
//   }

//   onSave(e) {
//     e.preventDefault();

//   }

//   render() {
//     const { updateStudent } = this.state.props;
//     const { name, address, description } = this.state;
//     const { componentDidUpdate, onSave } = this;
//     return (
//       <div>
//         <form>
//           <input value={name} onChange={handleChange} name='name' />
//         </form>
//       </div>
//     )
//   }
// }

// // const mapStateToProps = ({schools}, { match, history }) => {
// // return {

// // }
// // }

// const mapDispatchToProps;

// export default connect(mapStateToProps, mapDispatchToProps)(SchoolCreateUpdate);
