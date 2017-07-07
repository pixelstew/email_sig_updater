const google = require ('googleapis');
const key = require ('./Sig-Updater.json');
const accountConfig = require ('./account_config.json')

class GetEmailSigs {
  constructor() {
    this.groupMembers = []
    this.peopleDataArray = []
    this.gmail = google.gmail('v1')
    this.service = google.admin('directory_v1')
    this.userAuth = this.initAuth(
      ['https://www.googleapis.com/auth/admin.directory.group.member.readonly', 'https://www.googleapis.com/auth/admin.directory.user.readonly'],
      accountConfig.adminAccount
    )
    this.makeMemberArray()
  }

  initAuth(scopes, id){
    let usersJwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      scopes,
      id
    );
    return usersJwtClient
  }

  makeMemberArray(){
    this.service.members.list({
      groupKey: accountConfig.groupEmail,
      auth: this.userAuth
    }, (err, resp) => {
      if(err){
        console.log(err)
      } else {
        for(let key in resp.members){
          this.groupMembers.push(resp.members[key].email)
        }
        this.allUserDetails(this.groupMembers)
      }
    })
  }

  allUserDetails(){
    this.service.users.list({
      domain: accountConfig.domain,
      auth: this.userAuth
    },(err, resp) => {
      if(err){
        console.log(err)
      } else {
        this.sortUsers(resp)
      }
    })
  }

  sortUsers(resp){
    const allUsers = resp.users
    for(let key in allUsers){
      this.groupMembers.map((memberEmail) => {
        if(allUsers[key].primaryEmail === memberEmail){
          this.peopleDataArray.push({
            Email_address : allUsers[key].primaryEmail,
            First_name : allUsers[key].name.givenName,
            Last_name : allUsers[key].name.familyName
          })
        }
      })
    }
    this.setSigs(this.peopleDataArray)
  }

  setSigs(){
    //people.data.forEach(function(person){
    const person = this.peopleDataArray[31] //temp whilst in dev so i dont write over everyones sigs
    let config = {
      userId: person.Email_address,
      signature: `<div style="color:rgb(0,0,0);font-family:Helvetica;font-size:12px;font-style:normal;font-variant-caps:normal;font-weight:normal;letter-spacing:normal;text-align:start;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px"><p class="MsoNormal" style="margin:0cm 0cm 12pt;font-size:12pt;font-family:"Times New Roman",serif;line-height:15pt"><b><span style="font-family:Helvetica,sans-serif;color:rgb(67,67,67)"><br class="m_-8204957198603688593Apple-interchange-newline"><span class="il>${person.First_name}<span> ${person.Last_name}</span></b><span style="font-size:10pt;font-family:Helvetica,sans-serif;color:rgb(67,67,67)"><br>Ground Floor&nbsp;&nbsp;</span><span style="font-size:10pt;font-family:Helvetica,sans-serif;color:rgb(186,186,186)">|</span><span style="font-size:10pt;font-family:Helvetica,sans-serif;color:rgb(67,67,67)">&nbsp;&nbsp;Martin House&nbsp;<br>5 Martin Lane&nbsp;&nbsp;</span><span style="font-size:10pt;font-family:Helvetica,sans-serif;color:rgb(186,186,186)">|</span><span style="font-size:10pt;font-family:Helvetica,sans-serif;color:rgb(67,67,67)">&nbsp;&nbsp;London, EC4R 0DP&nbsp;<br><br><a href="http://www.bigsofa.co.uk/" style="color:purple" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=http://www.bigsofa.co.uk/&amp;source=gmail&amp;ust=1484483874784000&amp;usg=AFQjCNGQph4RNjXwXbXd1HCzxTBGn2Rsmg"><span style="color:rgb(67,67,67)">www.bigsofa.co.uk</span></a>&nbsp;&nbsp;</span><span style="font-size:10pt;font-family:Helvetica,sans-serif;color:rgb(186,186,186)">|</span><span style="font-size:10pt;font-family:Helvetica,sans-serif;color:rgb(67,67,67)">&nbsp;&nbsp;<a href="tel:+44%2020%207357%200033" value="+442073570033" target="_blank">+44 (0) 207 357 0033</a> &nbsp;&nbsp;</span><span style="font-size:10pt;font-family:Helvetica,sans-serif;color:rgb(186,186,186)">|</span><span style="font-size:10pt;font-family:Helvetica,sans-serif;color:rgb(67,67,67)">&nbsp; <a href="tel:+44%207789%20093758" value="+447789093758" target="_blank">+44(0)7789 093 758</a><u></u><u></u></span></p><div style="margin-top:7.5pt"><div class="MsoNormal" align="center" style="margin:0cm 0cm 0.0001pt;font-size:12pt;font-family:"Times New Roman",serif;text-align:center;line-height:15pt"><span style="font-size:10pt;font-family:Helvetica,sans-serif;color:rgb(67,67,67)"><hr size="3" width="100%" align="center"></span></div></div><table class="m_-8204957198603688593MsoNormalTable" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td width="133" style="width:100pt;padding:0cm"><div style="margin:0cm 0cm 0.0001pt;font-size:12pt;font-family:"Times New Roman",serif"><a href="http://www.bigsofa.co.uk/" style="color:purple" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=http://www.bigsofa.co.uk/&amp;source=gmail&amp;ust=1484483874784000&amp;usg=AFQjCNGQph4RNjXwXbXd1HCzxTBGn2Rsmg"><span style="color:rgb(67,67,67);text-decoration:none"><img border="0" width="200" height="80" id="m_-8204957198603688593_x0000_i1026" src="https://ci3.googleusercontent.com/proxy/ds6dkpcwy5OUZZxunzehlNySou2glNxZWQTcIBPMmoilFoyTj0EM4pSQRxiL63KQsJpODVHQbeZJB17IKJjHAjGngVxbjZ-ntVHP7qs=s0-d-e1-ft#http://www.bigsofa.co.uk/emails/signatures/big-sofa.gif" class="CToWUd"></span></a><u></u><u></u></div></td></tr></tbody></table><div><br></div></div>`
    };
    this.gmail.users.settings.sendAs.update({
      userId: config.userId,
      auth: this.initAuth(
        ['https://www.googleapis.com/auth/gmail.settings.basic', 'https://www.googleapis.com/auth/gmail.settings.sharing'],
        config.userId
      ),
      sendAsEmail: config.userId,
      fields: 'signature',
      resource: {
        signature: config.signature
      }
    },
    (err, resp) => {
      if(err){
        console.log('Request failed because: ' + err);
      } else {
        console.log(config.userId + ' updated!')
      }
    });
    //})
  }
}

new GetEmailSigs()
