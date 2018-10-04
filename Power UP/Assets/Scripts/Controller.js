#pragma strict

var HighScore : int;
var GameDisplay : TextMesh;
var HighScoreDisplay: TextMesh;
var Score : int = 0;

function Awake (){
	DontDestroyOnLoad (transform.gameObject);
}

function OnLevelWasLoaded (level : int) {
	if (Application.loadedLevel == 1){

	}
	if (Application.loadedLevel == 2){
		Score = 0;
	}
}

function FixedUpdate(){
	if (Application.loadedLevel == 0){
		Application.LoadLevel(1);
	}
	if (Application.loadedLevel == 1){
		if(Input.GetMouseButtonDown(0)){
			Application.LoadLevel(2);
		}
		HighScoreDisplay = GameObject.FindWithTag ("HighScore").gameObject.GetComponent(TextMesh);
		HighScoreDisplay.text = (HighScore.ToString());
	}
	if (Application.loadedLevel == 2){
		GameDisplay = GameObject.FindWithTag ("Score").gameObject.GetComponent(TextMesh);
		GameDisplay.text = (Score.ToString());
		if (Score > HighScore){
			HighScore = Score;
		}
	}
}

function Point(){
	Score++;
}