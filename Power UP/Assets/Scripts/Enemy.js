#pragma strict

var target: Transform;
var speed: float = 5;
var particle : GameObject;
public var sound : AudioClip;
var GameController : Controller;

function Start(){
	Destroy (gameObject, 10);
	target = GameObject.FindWithTag ("Player").transform;
	GameController = GameObject.FindWithTag ("GameController").gameObject.GetComponent(Controller);
}
	
function FixedUpdate () {
	transform.LookAt(target);
	var step = speed * Time.deltaTime;
	transform.position = Vector3.MoveTowards(transform.position, target.position, step);
}
	
function OnCollisionEnter (collision:Collision){
	if (collision.gameObject.tag == ("Bullet")){
		GameController.Point();
   	 	target.GetComponent.<AudioSource>().PlayClipAtPoint(sound, Vector3 (0, 0, 0));
   	 	particle = Instantiate(particle, transform.position, transform.rotation);
   	 	Destroy (particle, 1);
		Destroy (gameObject);
    }
}
	
function OnParticleCollision (other : GameObject) {
	if (other.gameObject.tag == ("BombParticles")){
		GameController.Point();
   		target.GetComponent.<AudioSource>().PlayClipAtPoint(sound, Vector3 (0, 0, 0));
   	 	particle = Instantiate(particle, transform.position, transform.rotation);
   	 	Destroy (particle, 1);
		Destroy (gameObject);
    }
}