const CLASS_NAME = 'html-modal'

export default class Modal {
    constructor() {
        this.applyModalStyle()
    }

    showDialog({title,body,okText='Ok',cancelText='Cancel'}) {
        return new Promise(function(resolve, reject) {
            // Create dialog element and set its attributes
            var dialog = document.createElement("dialog");
            dialog.setAttribute("id", "modalDialog");
            dialog.classList.add(CLASS_NAME)
            dialog.innerHTML = `
                <div class="header">
                  <span class="title">${title}</span>
                  <button type="button" data-btn-close aria-label="Close"></button>
                </div>
                <div class="body">
                  <span>${body}</span>
                </div>
                <div class="footer">
                  <button id="cancelButton">${cancelText}</button>
                  <button id="okButton">${okText}</button>
                </div>
            `;
            
            // Add dialog to the page
            document.body.appendChild(dialog);
            
            // Show dialog when the dialog element is ready
            dialog.showModal();
            
            // Add event listeners to buttons to handle user input
            var closeButton = document.querySelector("[data-btn-close]");
            var okButton = document.getElementById("okButton");
            var cancelButton = document.getElementById("cancelButton");
            
            closeButton.addEventListener("click", function() {
                // Remove dialog element from the page
                dialog.remove();
                // Resolve promise with the value true
                resolve(false);
            });

            okButton.addEventListener("click", function() {
                // Remove dialog element from the page
                dialog.remove();
                // Resolve promise with the value true
                resolve(true);
            });
            
            cancelButton.addEventListener("click", function() {
                // Remove dialog element from the page
                dialog.remove();
                // Resolve promise with the value false
                resolve(false);
            });
            
            // If the dialog is closed using any other method (e.g. escape key or clicking outside the dialog),
            // reject the promise with the value false
            dialog.addEventListener("cancel", function() {
                dialog.remove();
                reject(false);
            });
        });
    }

    applyModalStyle() {
        // Check if the style was already added
        if (document.querySelector("style#modalStyle")) {
          return;
        }
      
        var style = document.createElement("style");
        style.id = "modalStyle";
        style.innerHTML = `
          /* Overlay */
          dialog.${CLASS_NAME}::backdrop {
            background-color: rgba(0, 0, 0, 0.5);
          }

          /* Dialog */
          dialog.${CLASS_NAME} {
            border: none;
            border-radius: 0.3rem;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
            padding: 0;
          }

          dialog.${CLASS_NAME} .header,
          dialog.${CLASS_NAME} .body,
          dialog.${CLASS_NAME} .footer {
            background-color: white;
            padding: 16px 10px;
            border: none;
          }
          dialog.${CLASS_NAME} .header {
            border-bottom: solid 1px rgb(222 226 230);
            display: flex;
            align-items: center;
          }
          dialog.${CLASS_NAME} .footer {
            border-top: solid 1px rgb(222 226 230);
            display: flex;
            justify-content: flex-end;
          }

          dialog.${CLASS_NAME} [data-btn-close] {
            box-sizing: content-box;
            width: 1em;
            height: 1em;
            padding: .25em .25em;
            color: #000;
            background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
            border: 0;
            border-radius: .375rem;
            opacity: .5;
            margin-left: auto;
          }
      
          /* Title */
          dialog.${CLASS_NAME} .title {
            margin-top: 0;
            font-size: 1.1rem;
            font-weight: 400;
          }
      
          /* Body */
          dialog.${CLASS_NAME} p {
            margin-bottom: 1rem;
          }
      
          /* Buttons */
          dialog.${CLASS_NAME} button {
            border: none;
            border-radius: 0.3rem;
            padding: 0.25rem 0.5rem;
            margin: 0.25rem;
            font-size: 0.875rem;
            cursor: pointer;
          }
      
          /* OK button */
          dialog.${CLASS_NAME} #okButton {
            background-color: #007bff;
            color: #fff;
          }
      
          /* Cancel button */
          dialog.${CLASS_NAME} #cancelButton {
            background-color: #f0f0f0;
            color: #333;
          }
        `;
        document.head.appendChild(style);
      }
}