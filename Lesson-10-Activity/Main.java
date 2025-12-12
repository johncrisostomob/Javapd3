
class Main {

	public static void main(String[] args) {
    	(new Main()).init();
	}

	void init(){
		System.out.println()
  
   

  }
  double gpa( double GPA){
	if(gpa > 90){
	return gpa*1.1;
	}
	else{
		return gpa;
	}
  }
  double isGraduating(double gradelvl, double credits){
	if(gradelvl == 12 && credits >= 44){
		return true;
	}
	else{
		return false;
	}
  }
  double BMI(double weight, double height){
	double BMI = (weight/Math.pow(height,2))*703;
	if(BMI <= 18.4){
		return Underweight;
	}
	else if(BMI >= 18.5 && BMI <= 24.9){
		return Normal;
	}
	else if(BMI >= 25 && BMI <= 39.9){
		return Overweight;
	}
	else(BMI >= 40){
		return Obese;
	}
  }
  double shippingCost( double weight ){
	if( weight <= 10 ){
		return 0.00;
	}
	else if( weight > 10 && weight <= 15 ){
		return 5.00;
	}
	else if( weight > 15 && weight <= 25 ){
		return 10.00;
	}
	else( weight > 25 ){
		return 10.00 + ;
	}
  }


 
  
}