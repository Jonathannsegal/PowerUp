#pragma strict

var particle : GameObject;
public var sound : AudioClip;
private var power : GameObject;
private var target: Transform;

InvokeRepeating("Pulsates", 0, .2);
	
function Start(){
	yield WaitForSeconds(3);
	Explode();
}
	
function Explode(){
	target = GameObject.FindWithTag ("Player").transform;
	target.GetComponent.<AudioSource>().PlayClipAtPoint(sound, Vector3 (0, 0, 0));
	power = Instantiate(particle, transform.position, transform.rotation);
	Destroy (power, 1);
	Destroy (gameObject);
}
	
function Pulsates(){
	Pulsate();
}
	
function Pulsate() {
	GetComponent.<Renderer>().material.color = Color.blue;
	yield WaitForSeconds(.1);
	GetComponent.<Renderer>().material.color = Color.green;
}