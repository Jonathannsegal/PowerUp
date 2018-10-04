#pragma strict

var powerups : GameObject[];
var Enemy : Rigidbody;
var spawnlocation : Transform[];
var spawnNumber : int;
var timebetweenwave : int;
var waitforspawn : float;
var parent : GameObject;
private var i : int;
private var sl : int;
private var power : GameObject;
private var Enemyp : Rigidbody;

InvokeRepeating("Repeat", 1, timebetweenwave);
InvokeRepeating("Powerupspawn",0,Random.Range(.5, 2));

function Repeat(){
	Wave();
}		
			
function Wave(){
	while (i <= spawnNumber){
		Enemyp = Instantiate(Enemy, spawnlocation[sl].position, transform.rotation);
		Enemyp.transform.parent = parent.transform;
		yield WaitForSeconds(waitforspawn);
		sl++;
			if (sl == spawnlocation.Length){
				sl = 0;
			}
		i++;
	}
	i = 0;	
	spawnNumber = spawnNumber + 5;
}
		
function Powerupspawn () {
	power = Instantiate(powerups[Random.Range(0, powerups.length)], Vector3(Random.Range(-23, 23), Random.Range(-15, 15), 0), transform.rotation);
	Destroy (power, 4);
}