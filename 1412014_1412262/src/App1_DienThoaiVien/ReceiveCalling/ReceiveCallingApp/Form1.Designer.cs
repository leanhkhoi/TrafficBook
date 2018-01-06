using System;

namespace ReceiveCallingApp
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.submitBtn = new System.Windows.Forms.Button();
            this.phonenumberText = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.originRBtn = new System.Windows.Forms.RadioButton();
            this.premiumRBtn = new System.Windows.Forms.RadioButton();
            this.label4 = new System.Windows.Forms.Label();
            this.locationCb = new System.Windows.Forms.ComboBox();
            this.bindingSource1 = new System.Windows.Forms.BindingSource(this.components);
            this.button1 = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.bindingSource1)).BeginInit();
            this.SuspendLayout();
            // 
            // submitBtn
            // 
            this.submitBtn.Location = new System.Drawing.Point(170, 222);
            this.submitBtn.Name = "submitBtn";
            this.submitBtn.Size = new System.Drawing.Size(113, 23);
            this.submitBtn.TabIndex = 0;
            this.submitBtn.Text = "Send To App 2";
            this.submitBtn.UseVisualStyleBackColor = true;
            this.submitBtn.Click += new System.EventHandler(this.SubmitGuest_Click);
            // 
            // phonenumberText
            // 
            this.phonenumberText.Location = new System.Drawing.Point(170, 130);
            this.phonenumberText.Name = "phonenumberText";
            this.phonenumberText.Size = new System.Drawing.Size(272, 20);
            this.phonenumberText.TabIndex = 1;
            this.phonenumberText.TextChanged += new System.EventHandler(this.phonenumberText_TextChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(58, 133);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(78, 13);
            this.label1.TabIndex = 2;
            this.label1.Text = "Phone Number";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(58, 159);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(48, 13);
            this.label2.TabIndex = 4;
            this.label2.Text = "Location";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(58, 185);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(31, 13);
            this.label3.TabIndex = 6;
            this.label3.Text = "Type";
            // 
            // originRBtn
            // 
            this.originRBtn.AutoSize = true;
            this.originRBtn.Checked = true;
            this.originRBtn.Location = new System.Drawing.Point(170, 183);
            this.originRBtn.Name = "originRBtn";
            this.originRBtn.Size = new System.Drawing.Size(52, 17);
            this.originRBtn.TabIndex = 7;
            this.originRBtn.TabStop = true;
            this.originRBtn.Text = "Origin";
            this.originRBtn.UseVisualStyleBackColor = true;
            this.originRBtn.CheckedChanged += new System.EventHandler(this.originRBtn_CheckedChanged);
            // 
            // premiumRBtn
            // 
            this.premiumRBtn.AutoSize = true;
            this.premiumRBtn.Location = new System.Drawing.Point(261, 183);
            this.premiumRBtn.Name = "premiumRBtn";
            this.premiumRBtn.Size = new System.Drawing.Size(65, 17);
            this.premiumRBtn.TabIndex = 8;
            this.premiumRBtn.Text = "Premium";
            this.premiumRBtn.UseVisualStyleBackColor = true;
            // 
            // label4
            // 
            this.label4.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 36F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.Location = new System.Drawing.Point(18, 31);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(471, 55);
            this.label4.TabIndex = 9;
            this.label4.Text = "Add Call From Guest";
            this.label4.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            // 
            // locationCb
            // 
            this.locationCb.FormattingEnabled = true;
            this.locationCb.Location = new System.Drawing.Point(170, 156);
            this.locationCb.Name = "locationCb";
            this.locationCb.Size = new System.Drawing.Size(272, 21);
            this.locationCb.TabIndex = 10;
            this.locationCb.DropDown += new System.EventHandler(this.locationCb_DropDown);
            this.locationCb.SelectedIndexChanged += new System.EventHandler(this.locationCb_SelectedIndexChanged);
            this.locationCb.TextChanged += new System.EventHandler(this.locationCb_TextChanged);
            // 
            // bindingSource1
            // 
            this.bindingSource1.CurrentChanged += new System.EventHandler(this.bindingSource1_CurrentChanged);
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(304, 222);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(109, 23);
            this.button1.TabIndex = 11;
            this.button1.Text = "Send To App 3";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(501, 289);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.locationCb);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.premiumRBtn);
            this.Controls.Add(this.originRBtn);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.phonenumberText);
            this.Controls.Add(this.submitBtn);
            this.Name = "Form1";
            this.Text = "App Dien Thoai Vien";
            this.Load += new System.EventHandler(this.Form1_LoadAsync);
            ((System.ComponentModel.ISupportInitialize)(this.bindingSource1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

       


        #endregion

        private System.Windows.Forms.Button submitBtn;
        private System.Windows.Forms.TextBox phonenumberText;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.RadioButton originRBtn;
        private System.Windows.Forms.RadioButton premiumRBtn;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.ComboBox locationCb;
        private System.Windows.Forms.BindingSource bindingSource1;
        private System.Windows.Forms.Button button1;
    }
}

