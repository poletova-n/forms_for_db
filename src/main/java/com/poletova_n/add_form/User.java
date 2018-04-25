package com.poletova_n.add_form;

import java.io.Serializable;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.*;

import org.apache.commons.validator.routines.EmailValidator;


@Entity
public class User implements Serializable, Comparable<User>{
    @Id
    @GeneratedValue
    private int id;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String phone;

    @Column(columnDefinition="DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date birthday;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    private static boolean checkWithRegExp(String name, String phone){
        Pattern p1 = Pattern.compile("^[a-zа-я \\-]+$", Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CHARACTER_CLASS);
        Pattern p2 = Pattern.compile("^[0-9 \\-]+$", Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CHARACTER_CLASS);
        Matcher m1 = p1.matcher(name);
        Matcher m2 = p2.matcher(phone);
        return m1.matches() && m2.matches();
    }


    public boolean checkValidate(){
        boolean emailValid = EmailValidator.getInstance().isValid(getEmail());
        boolean valid = checkWithRegExp(getName(),getPhone());
        return getEmail().length() > 0 && getName().length() > 0 && emailValid && valid;
    }

    @Override
    public int compareTo(User o) {
        return 0;
    }
}
