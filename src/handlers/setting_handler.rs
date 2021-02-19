use rocket_contrib::json::{Json, JsonValue};
use std::fs;


#[post("/settings/brightness/<value>")]
pub fn set_brightness(value: i32) -> JsonValue{
  let file = "/sys/class/backlight/rpi_backlight/brightness";
  //let file = "brightness";
  fs::write(file, value.to_string());
  json!({
    "status": "ok"
  })
}

#[get("/settings/brightness")]
pub fn get_brightness() -> JsonValue{
  let file = "/sys/class/backlight/rpi_backlight/brightness";
  //let file = "brightness";
  let content = fs::read_to_string(file).expect("Something went wrong reading the file");

  json!({
    "brightness": content.trim()
  })
}