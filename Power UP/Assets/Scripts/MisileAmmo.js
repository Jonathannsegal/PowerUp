#pragma strict

var target: Transform;
var particle : GameObject;
var speed: float = 20;
public var sound : AudioClip;
private var power : GameObject;
private var player: Transform;

InvokeRepeating("Pulsates", 0, .2);
InvokeRepeating("Enemy", 0, .5);
		
function Start(){
	target = GameObject.FindWithTag ("Enemy").transform;
}
	
function Enemy(){
	target = GameObject.FindWithTag ("Enemy").transform;
}
	
function Update () {
	if(target != null){
		transform.LookAt(target);
		var step = speed * Time.deltaTime;
		transform.position = Vector3.MoveTowards(transform.position, target.position, step);
	}
}
	
function OnCollisionEnter (collision:Collision){
	if (collision.gameObject.tag == ("Enemy")){
		explode();
	}
}
	
function explode() {
	GetComponent.<AudioSource>().PlayClipAtPoint(sound, Vector3 (0, 0, 0));
	power = Instantiate(particle, transform.position, transform.rotation);
	Destroy (power, 1);
	Destroy (gameObject);
}
	
function Pulsates(){
	Pulsate();
}
	
function Pulsate() {
	GetComponent.<Renderer>().material.color = Color.red;
	yield WaitForSeconds(.1);
	GetComponent.<Renderer>().material.color = Color.gray;
}