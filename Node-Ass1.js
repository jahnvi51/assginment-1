const readline = require("readline");
const jl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fs = require("fs");

var dirname = "";
var filename = "";
var content = "";

var instruction = () => {
   console.log("\n enter 1 to create the  Directory ..");
   console.log("\n enter 2 to remove the Directory ..");
   console.log("\n enter 3 to write the file..");
   console.log("\n enter 4 to read the file..");
   console.log("\n enter 5 to delete the  text file..");
   console.log("\n enter 6 to Append Data the to file..");
   console.log("\n enter 7 to update and replace   the file with new data  entered..");
   console.log("\n enter 8 to Rename a text file..");
   console.log("\n enter 9 to exit");
};

var start = () => {
   jl.question("Enter Your Choice :- ",(answer) => {
    if(answer === "1"){
      createDirWizard();
    }
    else if(answer === "2"){
      removeDirWizard();
    }
    else if(answer === "3"){
      writeFileWizard();
    }
    else if(answer === "4"){
      readFileWizard();
    }
    else if(answer === "5"){
      deleteFileWizard();
    }
    else if(answer === "6"){
      appendFileWizard();
    }
    else if(answer === "7"){
      replaceFileWizard();
    }
    else if(answer === "8"){
      renameFileWizard();
    }
    else if(answer === "9"){
      jl.close()
    }
  });
};

var createDirWizard = () => {
  console.log("\n Welcome to the file Creation Wizard");
  jl.question("Name Of The Directory :-",(ans) => {
     dirname = ans;
     create_Dir();
  });
};

var create_Dir = () => {
   fs.mkdir(dirname,(err) => {
      if(err){
        console.log(err);
      }else{
        console.log("Directory Created SuccessFully..." + dirname);
      }
      repeat();
   });
};

var removeDirWizard = () => {
  jl.question("Enter Directory Name :- ",(ans) => {
    dirname = ans;
    removeDir();
  })
};

var removeDir = () => {
   fs.rmdir(dirname,(err) => {
      if(err){
        console.log(err);
      }else{
        console.log("Directory Removed Successfully...!");
      }
      repeat();
   });
}

var writeFileWizard = () => {
  jl.question("Enter File Name :-",(ans) => {
      filename = ans;
      jl.question("Enter File Content :-",(ans) => {
         content = ans;
         writeFileData();
      });
  });
};

var writeFileData = () => {
   fs.writeFile(filename + ".txt",content,(err) => {
      if(err){
        console.log(err);
      }
      else
      {
        console.log("File Created SuccessFully...!",filename);
      }
      repeat();
   });
};

var readFileWizard = () => {
   jl.question("Enter File Name :- ",(ans) => {
      filename = ans;
      fs.readFile(filename + ".txt","utf8",(err,result) => {
         if(err){
            console.log(err);
         }else{
            console.log(result);
         }
         repeat();
      });
   });
};

var deleteFileWizard = () => {
   jl.question("Enter File Name :- ",(ans) => {
     fs.unlink(ans + ".txt",(err) => {
         if(err){
              console.log(err);
         }else{
              console.log("File Deleted SuccessFully ....!" + ans);
         }
         repeat();
     });
   });
};

var appendFileWizard = () => {
  jl.question("Enter File Name To A Append :- ",(ans) => {
     filename = ans;
     jl.question("Enter Content :-",(ans) => {
        content = ans;
        fs.appendFile(filename + ".txt",content,(err) => {
          if(err){
             console.log(err);
          }else{
             console.log("File Appended Successfully..!" + filename);
          }
          repeat();
        });
     });
  });
};

var replaceFileWizard = () => {
    jl.question("Enter Your File Name :- ",(ans) => {
       filename = ans;
       jl.question("Enter Content Of Replace :- ",(ans) => {
         content = ans;
         jl.question("Enter New Content To Replace :-",(ans) => {
           const replace_Str = ans;
           fs.readFile(filename + ".txt","utf8",(err,data) => {
              if(err){
                 console.log(err);
                 repeat();
              }else{
                const res = data.replace(content,replace_Str);
                fs.writeFile(filename + ".txt",res,(err) => {
                  if(err){
                      console.log(err);
                  }else{
                     console.log("File Updated / Replaced SuccessFully...!" + filename);
                  }
                  repeat();
                });
              }
           });
         });
       });
    });
};

var renameFileWizard = () => {
   jl.question("Enter Old File Name :-",(ans) => {
     var oldFile = ans;
     jl.question("Enter New File Name :- ",(ans) => {
       fs.rename(oldFile + ".txt",ans + ".txt",(err) => {
          if(err){
             console.log(err);
          }else{
             console.log("File Renamed SuccessFully ... !" + ans + ".txt");
          }
          repeat();
       }); 
     });
   });
};

var repeat = () => {
  instruction();
  start();
};

console.log("Welcome To This Game..");
repeat();