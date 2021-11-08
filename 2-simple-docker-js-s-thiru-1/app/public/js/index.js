const Controller = {
  data() {
    return {
      "referee" : [],
      'refereeList': [],
      "books": [],
      "offers": [],
      "offerForm": {},
      selectedGame: null,
      selectedAssignment: null,
      selectedGameAssign: null,
      gameForm: {},
      games: [],
      unassignedGames: [],
      selectedOffer : null,
      "assignments": [],
      "assigns":[],
      assignForm : {}
      }
  },

  methods: {

    postOffer(evt) {
        if (this.selectedOffer === null) {
            this.postNewOffer(evt);
        } 
        else {
            this.postEditOffer(evt);
        }
      },

      postGame(evt) {
        if (this.selectedGame === null) {
          this.postNewGame(evt);
        } else {
          this.postEditGame(evt);
        }
      },

      fetchUnassigned() {
        this.selectUnassigned = true;
        this.fetchUnassignedGames();
      },
  
      fetchUnassignedGames() {
        console.log("Fetching Unassigned Games");
        fetch("api/reports/")
          .then((response) => response.json())
  
          .then((responseJson) => {
            console.log(responseJson);
            this.unassignedGames = responseJson;
          });
      },

      fetchGameData() {
        fetch("/api/games/")
          .then((response) => response.json())
  
          .then((responseJson) => {
            console.log(responseJson);
            this.games = responseJson;
          })
  
          .catch((err) => {
            console.error(err);
          });
      },

      postEditGame(evt) {
        this.gameForm.g_id = this.selectedGame.g_id;
  
        console.log("Updating:", this.gameForm);
        // alert("Posting!");
  
        fetch("api/games/update.php", {
          method: "POST",
          body: JSON.stringify(this.gameForm),
          headers: {
            "content-Type": "application/json; charset=utf-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log("Returned from post:", json);
            //TODO: test a result was returned!
            this.games = json;
  
            //Reset the form
            this.resetGameForm();
  
            //Refresh unassigned games
            this.fetchUnassigned();
          });
      }, 

      postEditAssignment(evt) {
        this.assignForm.RefID = this.selectedRef.RefID;
        this.assignForm.a_id = this.selectedAssignment.a_id;
  
        console.log("Updating:", this.assignForm);
        // alert("Posting!");
  
        fetch("api/assignment/update.php", {
          method: "POST",
          body: JSON.stringify(this.assignForm),
          headers: {
            "content-Type": "application/json; charset=utf-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log("Returned from post:", json);
            //TODO: test a result was returned!
            this.assignments = json;
  
            //Reset the form
            this.resetAssignForm();
            
          });
      },
  

      postDeleteAssignment(o) {
        ///Use "prompt" instead of confirm to have them type in a response, not just a clickable button
        if (
          !confirm(
            "Are you sure you want to delete the game from " +
              o.a_id +
              "?"
          )
        ) {
          return;
        }
  
        fetch("api/assignment/delete.php", {
          method: "POST",
          body: JSON.stringify(o),
          headers: {
            "content-Type": "application/json; charset=utf-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log("Returned from post:", json);
            //TODO: test a result was returned!
            this.assignments = json;
  
            //Reset the form
            this.resetAssignForm();
          });
      },

      selectAssignment(o) {
        this.selectedAssignment = o;
        this.assignForm = Object.assign({}, this.selectedAssignment);
      },
  
      resetAssignForm() {
        this.selectedAssignment = null;
        this.assignForm = {};
      },
  

      postDeleteGame(o) {
        if (
          !confirm(
            "Are you sure you want to delete the game from field " +
              o.field_num +
              "? Please note, you must remove all assignments from this game before continuing."
          )
        ) {
          return;
        }
  
        fetch("api/games/delete.php", {
          method: "POST",
          body: JSON.stringify(o),
          headers: {
            "content-Type": "application/json; charset=utf-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log("Returned from post:", json);
            //TODO: test a result was returned!
            this.games = json;
  
            //Reset the form
            this.resetGameForm();
  
            //Retrieve new unassigned games
            this.fetchUnassigned();
          });
      },

      selectGame(o) {
        this.selectedGame = o;
        this.gameForm = Object.assign({}, this.selectedGame);
      },
  
      resetGameForm() {
        this.selectedGame = null;
        this.gameForm = {};
      },

      postNewGame(evt) {
        ///this.gameForm.game_id = this.selectedGame.game_id;
        console.log("Creating:", this.gameForm);
        // alert("Posting!");
  
        fetch("api/games/create.php", {
          method: "POST",
          body: JSON.stringify(this.gameForm),
          headers: {
            "content-Type": "application/json; charset=utf-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log("Returned from post:", json);
            //TODO: test a result was returned!
            this.games = json;
  
            //Reset the form
            this.gameForm = {};
  
            //Fetch Unassigned
            this.fetchUnassigned();
          });
      },

    fetchRefereeList() {
        fetch('/api/referee/index.php')
        .then( response => response.json() )
        .then( (parsedJson) => {                
            this.refereeList = parsedJson;                
        })
        .catch( (err) => {
            console.error(err);
        })
    },
    
    postEditOffer(evt) {
        // this.offerForm.studentId = this.selectedStudent.id;
        this.offerForm.RefID = this.selectedOffer.RefID;
  
        // console.log("Updating!", this.offerForm);
  
        fetch('api/referee/update.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
  
            // reset the form
            this.resetOfferForm();
            this.fetchRefereeList();
          });
      },
    postNewOffer(evt) {
        // this.offerForm.studentId = this.selectedStudent.id;        

        fetch('api/referee/create.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;

            // reset the form
            this.resetOfferForm();
            this.fetchRefereeList();
        })

        .catch( err => {
          alert("Please fill the requirements!");
        });
    },
  
      postDeleteOffer(o) {
        if (!confirm("Are you sure you want to delete the offer from "+o.RefID+"?")) {
          return;
        }
        console.log("Delete!", o);
  
        fetch('api/referee/delete.php', {
            method:'POST',
            body: JSON.stringify(o),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( (response) => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
  
            // reset the form
            this.resetOfferForm();
            this.fetchRefereeList();
          });
      },
      
      selectOffer(evt) {
        if (evt == this.selectedOffer) {
            return;
        }
        this.selectedOffer = evt;
        this.assignments = [];
        this.fetchAssignmentData(this.selectedOffer);
    },
      selectOfferToEdit(o) {
          this.selectedOffer = o;
          this.offerForm = Object.assign({}, this.selectedOffer);
      },
  
      resetOfferForm() {
          this.selectedOffer = null;
          this.offerForm = {};
        },
        fetchAssignmentData(ref){
            console.log("Fetching assignment data for ", ref);
            fetch('/api/assignment/?RefID=' + ref.RefID)
            .then( response => response.json())
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
    
            .catch( (err) => {
    
                    console.error(err);
            })
        },
        postAssignment(evt) {
            if(this.selectedAssignment === null) {
                this.postNewAssignment(evt);
            } else {
                this.postEditAssignment(evt);
            }
        },
        postEditAssignment(evt) {
            this.assignForm.RefID = this.selectedOffer.RefID;
            this.assignForm.a_id = this.selectedAssignment.a_id;
      
            console.log("Updating:", this.assignForm);
            // alert("Posting!");
      
            fetch('api/assignment/update.php', {
                method:'POST',
                body: JSON.stringify(this.assignForm),
                headers: {
                    "content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then ( json => {
                console.log("Returned from post:", json);
                //TODO: test a result was returned!
                this.assignments = json;
                //Reset the form
                this.resetAssignForm();
            });
        },
        postNewAssignment(evt) {

            ///this.gameForm.game_id = this.selectedGame.game_id;
            console.log("Creating:", this.assignForm);
            // alert("Posting!");
    
            fetch('api/assignment/create.php', {
                method:'POST',
                body: JSON.stringify(this.assignForm),
                headers: {
                    "content-Type": "application/json; charset=utf-8",
                    'Accept': 'application/json'
                }
            })
            .then( response => response.json() )
            .then ( json => {
                console.log("Returned from post:", json);
                //TODO: test a result was returned!
                this.assignments = json;
    
                //Reset the form
                this.assignForm = {};
            });
        },
        postDeleteAssignment(o) {

            ///Use "prompt" instead of confirm to have them type in a response, not just a clickable button
            if (!confirm("Are you sure you want to delete the game from "+o.a_id+"?")){
                return; 
            }
    
            fetch('api/assignment/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                    "content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then ( json => {
                console.log("Returned from post:", json);
                //TODO: test a result was returned!
                this.assignments = json;
    
                //Reset the form
                this.resetAssignForm();
            });
        },
        selectGames(game) {
            if (game == this.selectedGameAssign){
                return;
            }
            this.selectedGameAssign = game;
            this.assigns = [];
            this.fetchGamesData(this.selectedGameAssign);
    
        },
        fetchGamesData(game){
            console.log("Fetching game data for ", game);
            fetch('/api/assignment/selectByGame.php/?g_id=' + game.g_id)
            .then( response => response.json())
            .then( (responseJson) => {
                console.log(responseJson);
                this.assigns = responseJson;
            })
    
            .catch( (err) => {
    
                    console.error(err);
            })
        }    
  
      },

created() {
    this.fetchRefereeList();
    this.fetchGameData();    
}
}

Vue.createApp(Controller).mount('#controller');