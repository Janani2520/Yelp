function validate()
    {
        var x = document.forms["myForms"]["mail"].value;
        const pattern = /^[^ ]+@[abc]+\.[com]{2,3}$/
        if(x.match(pattern) )
        {
            alert("valid mail id");
        }
        else{
            alert("invalid mail id");
        }
    }