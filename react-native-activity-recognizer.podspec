require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-activity-recognizer"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-activity-recognizer
                   DESC
  s.homepage     = "https://github.com/dowatugkins/react-native-activity-recognizer"
  s.license      = "MIT"
  # s.license    = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = { "Doug Watkins" => "doug@dougwatkinsdev.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/dowatugkins/react-native-activity-recognizer.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  # ...
  # s.dependency "..."
end
