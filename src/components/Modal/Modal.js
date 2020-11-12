import React from 'react';

import './Modal.css';

class Modal extends React.Component{
    componentDidMount(){
        window.onclick = function(event) {
            let modal = document.getElementById("myModal");
            if (event.target == modal) {
              modal.style.display = "none";
            }
        }
    }
    closeHandler = () => {
        document.getElementById("myModal").style.display = "none";
    }
    render(){
        return(
            <div id="myModal" class="modal">

                <div class="modal-content">
                    <span class="close" onClick={this.closeHandler}>&times;</span>
                    <p>Some text in the Modal..</p>
                </div>

            </div>
        )
    }
}

export default Modal;