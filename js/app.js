$(document).ready(function(){
    //INPUT (NAME AND EMAIL)
    $(".nameError").hide();
    $(".blankEmailError").toggleClass("error");
    $(".nameError").toggleClass("error");
    $(".emailError").hide();
    $(".emailError").toggleClass("error");
    const userReg = new RegExp(/^[a-z]*( [a-z]*)?$/, 'gi');
    const emailReg = new RegExp(/^\w*(\.\w*)?@\w*(\.[a-z]{1,})$/, 'g');
    function checkName(){//returns boolean
        if($("#name").val().length==0){
            return false;
        }
        userReg.lastIndex=0;
        return userReg.test($("#name").val());
    }
    function checkEmail(){//returns boolean
        emailReg.lastIndex=0;
        return emailReg.test($("#mail").val());
    }
    function createListener(element, validator, name1) {//function to true or false of anything
        if(validator){//Valid
            console.log(element.val() + " valid");
            if(name1){
                $(".nameError").hide();
            }else{
                $(".emailError").hide();
            }
        } else {//Invalid
            console.log(element.val() + " invalid");
            if(name1){
                $(".nameError").show();
            }else{
                if($("#mail").val().length<=0){
                    $(".blankEmailError").show();
                    $(".emailError").hide();
                } else {
                    $(".blankEmailError").hide();
                    $(".emailError").show();
                }
            }
        }
    }
    $("#name").on('keyup', function(){//Event Listener
        createListener($('#name'), checkName(), true);
    });
    $("#mail").on('keyup', function(){//Event Listener
        createListener($('#mail'), checkEmail(), false);
    });
    //DROP DOWN JOB ROLE
    $("#other-option").hide();
    function jobRole(){
        console.log($("#title").val());
        if($("#title").val()==='other'){
            $("#other-option").show();
        } else {
            $("#other-option").hide();
        }
    }
    $("#title").on('change', function(){jobRole()});
    //DROP DOWN T-SHIRT INFO
    const shirtReg = new RegExp(/Puns/gi);
    $("#color").hide();
    function shirtDesign(){
        shirtReg.lastIndex=0;
        if(shirtReg.test($("#design").val())){
            $("#color option").each(function(){
                $(this).prop('selected', false);
                shirtReg.lastIndex=0;
                if(shirtReg.test($(this).prop('text'))){
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        } else {
            $("#color option").each(function(){
                shirtReg.lastIndex=0;
                if(shirtReg.test($(this).prop('text'))){
                    $(this).hide();
                } else {
                    if(/tomato/gi.test($(this).prop("text"))){
                        $(this).prop('selected', true);
                    }
                    $(this).show();
                }
            });
        }
        $("#color").show();
    }
    $("#design").on("change", function(){shirtDesign()});
    //ACTIVITY REGISTRATION
    $(".activityError").hide();
    $(".activityError").toggleClass("error");
    $("#costInfo").hide();
    let selected = [];
    let cost=0;
    let activities=$(".activities :input");
    $(".activities").change((event)=>{
        activities.each(function(i, e){
            if($(e).is(":checked")){
                if(!selected.includes($(e).attr("name"))){
                    selected.push($(e).attr("name"));
                    cost+=parseInt($(e).attr("data-cost").match(/\d{3}/g));
                    activities.each(function(i2, e2){
                        if($(e).attr("data-day-and-time")==$(e2).attr("data-day-and-time")){
                            if($(e).attr("name") != $(e2).attr("name")){
                                //STRIKETHROUGH
                                //DISABLE
                                console.log($(e2));
                                $(e2).parent().toggleClass("strike");
                                $(e2).prop("disabled", !$(e2).prop("disabled"));
                            }
                        }
                    });
                }
            } else {
                if(!$(event.target).is(":checked")){
                    if(selected.includes($(e).attr("name"))){
                        let i=0;
                        for(i=0;i<selected.length;i++){
                            if(selected[i]==$(e).attr("name")){
                                console.log(selected.pop(i));
                                cost-=parseInt($(e).attr("data-cost").match(/\d{3}/g));
                            }
                        }
                        activities.each(function(i2, e2){
                            if($(e).attr("data-day-and-time")==$(e2).attr("data-day-and-time")){
                                if($(e).attr("name") != $(e2).attr("name")){
                                    //STRIKETHROUGH
                                    //DISABLE
                                    $(e2).parent().toggleClass("strike");
                                    $(e2).prop("disabled", !$(e2).prop("disabled"));
                                }
                            }
                        });
                    }
                }
            }
            $("#costInfo").text("$"+cost.toString());
            if(!$("#costInfo").is(":visible")){
                $("#costInfo").show();
            }
        });
        if(selected.length<=0){
            $(".activityError").show();
        } else {
            $(".activityError").hide();
        }
    });
    //PAYMENT INFORMATION
    $(".paymentError").show();
    $(".paymentError").toggleClass("error");
    $(".ccnumError").toggleClass("error");
    $(".zipError").toggleClass("error");
    $(".cvvError").toggleClass("error");
    $(".ccnumError").hide();
    $(".zipError").hide();
    $(".cvvError").hide();
    $("#credit-card").hide();
    $("#paypal").hide();
    $("#bitcoin").hide();
    $("#payment").on("change", function(event){
        if($("#payment").children().length==4){
            $("#payment option[value='select method']").remove();
            $(".paymentError").hide();
        }
        $("#credit-card").hide();
        $("#paypal").hide();
        $("#bitcoin").hide();
        switch($(event.target).val()){
            case "Credit Card":
                $("#credit-card").show();
                break;
            case "PayPal":
                $("#paypal").show();
                break;
            case "Bitcoin":
                $("#bitcoin").show();
                break;
            default://Only there if "Select Payment Method remained an option."
                $("#credit-card").show();
        }
    });
    const creditReg = new RegExp(/^\d{12,15}\d$/, 'g');
    const zipReg = new RegExp(/^\d{4}\d$/, 'g');
    const cvvReg = new RegExp(/^\d{2}\d$/, 'g');
    function checkCCNUM(){//returns boolean
        creditReg.lastIndex=0;
        let valid=creditReg.test($("#cc-num").val());
        if(valid){
            $(".ccnumError").hide();
        } else {
            $(".ccnumError").show();
        }
        return valid;
    }
    function checkZIP(){//returns boolean
        zipReg.lastIndex=0;
        let valid=zipReg.test($("#zip").val());
        if(valid){
            $(".zipError").hide();
        } else {
            $(".zipError").show();
        }
        return valid;
    }
    function checkCVV(){//returns boolean
        cvvReg.lastIndex=0;
        let valid=cvvReg.test($("#cvv").val());
        if(valid){
            $(".cvvError").hide();
        } else {
            $(".cvvError").show();
        }
        return valid;
    }
    $("#cc-num").on('keyup', function(){//Event Listener
        checkCCNUM();
    });
    $("#zip").on('keyup', function(){//Event Listener
        checkZIP();
    });
    $("#cvv").on('keyup', function(){//Event Listener
        checkCVV();
    });
    //SUBMIT VALIDATION
    $("button").click(()=>{
        let pass=true;
        //input (name and email)
        if(!checkName()){
            alert("Name field must be corrected.");
            pass=false;
        }
        if(!checkEmail()){
            alert("Email field must be corrected.");
            pass=false;
        }
        if(selected.length<=0){
            alert("Please select at least one activity.");
            pass=false;
        }
        if($("#credit-card").is(":visible")){
            if(!checkCCNUM()){
                alert("Credit Card Number must be corrected.");
                pass=false;
            }
            if(!checkZIP()){
                alert("Zip Code must be corrected.");
                pass=false;
            }
            if(!checkCVV()){
                alert("CVV must be corrected.");
                pass=false;
            }
        }
        if(pass){
            alert("submitted! Congratulations " + $("#name").val() + ".");
        } else {
            event.preventDefault();
        }
    });
});