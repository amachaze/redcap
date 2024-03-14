const template = `
<form>
    <div data-legal-message></div>

    <div>
        <label>Select MRNs</label>
        <div data-mrns-container>
            <p>no MRNs available</p>
        </div>
    </div>

    <div>
        <label for="UserIDType">EHR user type</label>
        <select class="form-item" name="UserIDType" data-user-type>        
            <option value=""></option>
        </select>
        <span class="small block">
            (EHR user: <span data-ehr-user></span>)
        </span>
    </div>

    <div>
        <label for="Reason">Reason</label>
        <select class="form-item" name="Reason" data-reasons>        
            <option value=""></option>
        </select>
    </div>

    <div>
        <label for="Explanation">Explanation</label>
        <textarea class="form-item" name="Explanation" id="explanation" rows="3" data-explanation></textarea>
    </div>

    <div>
        <label for="password">REDCap password</label>
        <input class="form-item" type="password" name="password" data-redcap-password>
    </div>

</form>
`

export default template