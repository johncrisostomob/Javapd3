class Main {

	public static void main(String[] args) {
    	(new Main()).init();
	}

  void init(){

  }
  
  void print(String msg){
	System.out.println(msg);

  }
  void init(){
	print("Hello");
  }
  double F to C( double F ){
	double C = (F-32)*9/5.0;
  }
  double sphereVolume( double r ){
  double v = 4/3.0*Math.PI*r*r*r;
  return v;
  }
  double coneVolume(double r, double h){
    double V = 1.0/3*Math.PI*r*r*h;
    return v;
  }
  double distance(double x1, double y1, double x2, double y2){
    double d = Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
    return d;
  }
}