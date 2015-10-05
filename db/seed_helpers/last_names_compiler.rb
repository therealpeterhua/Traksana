last_names = File.readlines('last_names_raw.txt');

#pull name before first tab into separate file
File.open('last_names.txt', 'w') do |file|
  last_names.each do |last_name|
    first_space_idx = last_name.index("\t")
    name = last_name[0...first_space_idx].capitalize
    file.write(name + "\n")
  end
end
