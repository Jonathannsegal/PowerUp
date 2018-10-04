#pragma strict

var moveSpeed : float = 1.0;
var Health : int = 20;
private var Ammo : GameObject;

var bullet : GameObject;
var bomb : GameObject;
var misile : GameObject;
var sheild : GameObject;
var PowerParticles : GameObject[];

var bulletSpeed : float = 1.0;
var shootDelay : float = 0.2;

public var Fire : AudioClip;
public var Hurt : AudioClip;
public var Power : AudioClip;
var HealthText : GameObject;
var number : int = 1;

private var canShoot : boolean = true;
private var i : int = 0;
private var e : int = 0;

function Start(){
Ammo = bullet;
}	

function FixedUpdate (){
	HealthText.GetComponent(TextMesh).text = (Health.ToString());
	if (Health <= 0){
		Playerdie();
	}				
	var moveDirection = Vector3(Input.GetAxis("Horizontal"),Input.GetAxis("Vertical"), 0);
	GetComponent.<Rigidbody>().MovePosition(transform.position + moveDirection*moveSpeed*Time.deltaTime);
	if ((Input.GetAxis("FireHorizontal") != 0.0f || Input.GetAxis("FireVertical") != 0.0f) && canShoot){
		GetComponent.<AudioSource>().PlayClipAtPoint(Fire, Vector3 (0, 0, 0));
		var shootDirection = Vector3(Input.GetAxis("FireHorizontal"),Input.GetAxis("FireVertical"), 0).normalized;
		var AmmoInstance = Instantiate(Ammo,transform.position,Quaternion.LookRotation(shootDirection));
		Destroy (AmmoInstance, 10);
		AmmoInstance.GetComponent.<Rigidbody>().AddForce(shootDirection*bulletSpeed,ForceMode.VelocityChange);
		canShoot = false;
		Invoke("ShootDelay", shootDelay);
	}
}

function OnCollisionEnter(collision : Collision) {
	GetComponent.<Rigidbody>().velocity = Vector3.zero;
	if (collision.gameObject.tag == "Enemy"){
		Damage();
	}
    if (collision.gameObject.tag == "Health"){
    var Healthp = Instantiate(PowerParticles[0], transform.position, transform.rotation);
    Destroy (Healthp, 1);
    GetComponent.<AudioSource>().PlayClipAtPoint(Power, Vector3 (0, 0, 0));
    	Heal();
    	Destroy(collision.gameObject,0);
    }
    if (collision.gameObject.tag == "Machinegun"){
    var MachineP = Instantiate(PowerParticles[1], transform.position, transform.rotation);
    Destroy (MachineP, 1);
    GetComponent.<AudioSource>().PlayClipAtPoint(Power, Vector3 (0, 0, 0));
    Destroy(collision.gameObject,0);
    shootDelay = 0;
    yield WaitForSeconds(1);
    shootDelay = 0.2;
    }
    if (collision.gameObject.tag == "Bomb"){
    var Bombp = Instantiate(PowerParticles[2], transform.position, transform.rotation);
    Destroy (Bombp, 1);
    GetComponent.<AudioSource>().PlayClipAtPoint(Power, Vector3 (0, 0, 0));
    Destroy(collision.gameObject,0);
    Ammo = bomb;
    yield WaitForSeconds(1);
    Ammo = bullet;
    }
    if (collision.gameObject.tag == "Seekingmissile"){
    var Missilep = Instantiate(PowerParticles[3], transform.position, transform.rotation);
    Destroy (Missilep, 1);
    GetComponent.<AudioSource>().PlayClipAtPoint(Power, Vector3 (0, 0, 0));
    Destroy(collision.gameObject,0);
    Ammo = misile;
    yield WaitForSeconds(1);
    Ammo = bullet;
    }
    if (collision.gameObject.tag == "Shield"){
    GetComponent.<AudioSource>().PlayClipAtPoint(Power, Vector3 (0, 0, 0));
    Destroy(collision.gameObject,0);
    Shield();
    }
}

function Shield(){
	var	currentshield = Instantiate(sheild, transform.position, transform.rotation);
	currentshield.transform.parent = transform;
	Destroy (currentshield, 1.5);
}
	
function OnCollisionExit(collision : Collision){
	GetComponent.<Rigidbody>().velocity = Vector3.zero;
}

function ShootDelay(){
	canShoot = true;
}

function Damage(){
	if (Health > 0){
		GetComponent.<AudioSource>().PlayClipAtPoint(Hurt, Vector3 (0, 0, 0));
		Health--;
	}
}

function Heal(){
	if (Health < 40){
		Health++;
	}
}

function Playerdie(){
	yield WaitForSeconds(1);
	Application.LoadLevel("menu");
}