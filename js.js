  function validate()
                {
                    var cusname = document.getElementById("cname");
                    var cusphn = document.getElementById("cphone");
                    if(cusname.value=="" || cusphone.value=="")
                        {
                            alert("Blank Customer Name or Phone");
                            return false;
                        }
                    else 
                        {
                            true;
                        }
                }
                function validatecar()
                {
                    var vid = document.getElementById("vid");
                    var vdes = document.getElementById("vdis");
                    var year = document.getElementById("year");
                    var type = document.getElementById("type");
                    var category = document.getElementById("category");
                   
                   
        
                    if(year.value=="" || vdes.value=="" || vid.value==""){
                        alert("Required fields left black");
                        return false;
                    }
                    else
                    {
                         true;
                    }
                }