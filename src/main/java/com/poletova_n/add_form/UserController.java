package com.poletova_n.add_form;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class UserController {

    @Autowired
    UserService userService;

   @RequestMapping("/")
   public String authorize(){
       return "authorization";
   }


    @RequestMapping("/add")
    public String mainPage(Model model)
    {
        User user = new User();
        model.addAttribute("user", user);
        return "add";
    }


    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public String addRecord(@ModelAttribute User user, Model model){
        if(user.checkValidate()) {
            userService.save(user);
        }
        return "redirect:/";
    }


    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String getList(Model model)
    {
        List<User> list = userService.getAll();
        System.out.println(list.size());
        model.addAttribute("list", list);
        return "list";
    }

    @ResponseBody
    @RequestMapping(value = "/list", method = RequestMethod.PUT)
    public int updateRecord(@RequestBody User user, Model model)
    {
        if(user.checkValidate()) {
            userService.save(user);
        }
        return user.getId();
    }


    @ResponseBody
    @RequestMapping(value = "/list", method = RequestMethod.DELETE)
    public Integer deleteRecord(@RequestBody User user, Model model)
    {
        userService.delete(user);
        return user.getId();
    }

}